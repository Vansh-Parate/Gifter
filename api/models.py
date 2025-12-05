"""Pydantic data models for the Gift Suggestion API."""

from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class GiftRequest(BaseModel):
    """Request model for gift suggestions."""
    
    user_message: str = Field(
        ...,
        min_length=20,
        description="User's description of the person they need a gift for"
    )
    context: Optional[Dict[str, str]] = Field(
        default=None,
        description="Additional context for the gift suggestion"
    )


class GiftSuggestion(BaseModel):
    """Model for a single gift suggestion."""
    
    gift_name: str = Field(
        ...,
        description="Name of the suggested gift"
    )
    reason: str = Field(
        ...,
        description="Reason why this gift is suitable"
    )
    price_range: str = Field(
        ...,
        description="Approximate price range for the gift"
    )
    where_to_buy: List[str] = Field(
        ...,
        description="List of places where the gift can be purchased"
    )


class AgentResponse(BaseModel):
    """Response model from the AI agent."""
    
    suggestions: List[GiftSuggestion] = Field(
        ...,
        description="List of gift suggestions"
    )
    additional_notes: str = Field(
        default="",
        description="Additional notes or tips for the user"
    )


class HealthResponse(BaseModel):
    """Health check response model."""
    
    status: str = Field(default="healthy")


class ErrorResponse(BaseModel):
    """Error response model."""
    
    detail: str = Field(..., description="Error detail message")
