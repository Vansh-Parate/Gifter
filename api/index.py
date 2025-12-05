"""FastAPI application for the Gift Suggestion API."""

import logging
import time
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

try:
    from .agent import get_gift_suggestions
    from .config import get_settings
    from .models import AgentResponse, ErrorResponse, GiftRequest, HealthResponse
except ImportError:
    from agent import get_gift_suggestions
    from config import get_settings
    from models import AgentResponse, ErrorResponse, GiftRequest, HealthResponse

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan context manager for startup/shutdown events."""
    logger.info("Starting Gift Suggestion API...")
    yield
    logger.info("Shutting down Gift Suggestion API...")


# Create FastAPI app
app = FastAPI(
    title="Gift Suggestion API",
    description="AI-powered gift suggestion service using Pydantic AI",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS - load settings lazily to avoid crashes on import
def setup_cors():
    """Setup CORS middleware with error handling."""
    try:
        settings = get_settings()
        cors_origins = settings.cors_origins
        logger.info(f"CORS origins: {cors_origins}")
    except Exception as e:
        logger.warning(f"Failed to load CORS settings: {str(e)}. Using fallback.")
        cors_origins = ["*"]  # Allow all origins as fallback
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

setup_cors()


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Middleware to log all requests and responses."""
    start_time = time.time()
    
    logger.info(f"Request: {request.method} {request.url.path}")
    
    response = await call_next(request)
    
    process_time = time.time() - start_time
    logger.info(
        f"Response: {request.method} {request.url.path} "
        f"- Status: {response.status_code} - Time: {process_time:.3f}s"
    )
    
    return response


@app.get("/api/health")
async def health_check():
    """Health check endpoint.
    
    Returns:
        HealthResponse: Health status of the API.
    """
    try:
        # Try to load settings to verify configuration
        settings = get_settings()
        return {
            "status": "healthy",
            "config_loaded": True,
            "cors_origins": settings.cors_origins
        }
    except Exception as e:
        # Still return healthy but indicate config issue
        logger.warning(f"Health check: Settings not fully loaded: {str(e)}")
        return {
            "status": "healthy",
            "config_loaded": False,
            "warning": "Configuration may be incomplete"
        }


@app.post(
    "/api/suggest-gift",
    response_model=AgentResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    }
)
async def suggest_gift(request: GiftRequest) -> AgentResponse:
    """Generate gift suggestions based on user input.
    
    Args:
        request: Gift request with user message and optional context.
        
    Returns:
        AgentResponse: AI-generated gift suggestions.
        
    Raises:
        HTTPException: If the request is invalid or agent fails.
    """
    try:
        logger.info(f"Received gift request: {request.user_message[:50]}...")
        
        # Get suggestions from AI agent
        response = await get_gift_suggestions(request.user_message)
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
        
    except Exception as e:
        logger.error(f"Internal error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to generate gift suggestions. Please try again."
        )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unhandled errors."""
    logger.error(f"Unhandled error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred."}
    )


# Vercel serverless handler
# This must be at module level for Vercel to find it
from mangum import Mangum

# Disable lifespan events for serverless (they can cause issues)
handler = Mangum(app, lifespan="off")