"""Pydantic AI agent configuration for gift suggestions."""

import logging
from typing import Optional

from openai import AsyncOpenAI
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider

try:
    from .config import get_settings
    from .models import AgentResponse
except ImportError:
    from config import get_settings
    from models import AgentResponse

# Configure logging
logger = logging.getLogger(__name__)

# System prompt for the gift suggestion agent
SYSTEM_PROMPT = """You are a helpful gift suggestion assistant. When users describe someone they need a gift for, analyze their description and suggest 3 thoughtful, personalized gift ideas.

Consider the person's:
- Interests and hobbies
- Age and life stage
- Relationship to the gift giver
- Any mentioned preferences or constraints
- Budget if specified

For each suggestion, provide:
1. The gift name
2. A clear reason why this gift suits the person
3. A realistic price range
4. 2-3 places where it can be purchased

Be creative but practical. Suggest gifts that show thoughtfulness and consideration."""


def create_agent() -> Agent[None, AgentResponse]:
    """Create and configure the Pydantic AI agent.
    
    Returns:
        Agent: Configured Pydantic AI agent for gift suggestions.
        
    Raises:
        ValueError: If settings cannot be loaded or API key is missing.
    """
    try:
        settings = get_settings()
    except Exception as e:
        logger.error(f"Failed to load settings: {str(e)}")
        raise ValueError(
            "Configuration error: Unable to load settings. "
            "Please check your environment variables in Vercel."
        ) from e
    
    if not settings.openrouter_api_key:
        raise ValueError(
            "OPENROUTER_API_KEY is required but not set. "
            "Please set it in your Vercel project settings."
        )
    
    # Configure OpenRouter client with custom base_url
    client = AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=settings.openrouter_api_key,
    )
    
    # Create provider with custom client
    provider = OpenAIProvider(openai_client=client)
    
    # Configure model with provider
    model = OpenAIChatModel(
        model_name=settings.model_name,
        provider=provider,
    )
    
    # Create agent with structured output (output_type instead of result_type)
    agent = Agent(
        model=model,
        output_type=AgentResponse,
        system_prompt=SYSTEM_PROMPT,
    )
    
    return agent


# Global agent instance (lazy initialization)
_agent: Optional[Agent[None, AgentResponse]] = None


def get_agent() -> Agent[None, AgentResponse]:
    """Get or create the global agent instance.
    
    Returns:
        Agent: The gift suggestion agent.
    """
    global _agent
    if _agent is None:
        _agent = create_agent()
        logger.info("Gift suggestion agent initialized")
    return _agent


async def get_gift_suggestions(user_message: str) -> AgentResponse:
    """Get gift suggestions for the given user message.
    
    Args:
        user_message: User's description of the gift recipient.
        
    Returns:
        AgentResponse: Structured gift suggestions.
        
    Raises:
        Exception: If the agent fails to generate suggestions.
    """
    agent = get_agent()
    
    try:
        logger.info(f"Processing gift request: {user_message[:50]}...")
        result = await agent.run(user_message)
        # Use result.output instead of result.data (new API)
        logger.info(f"Generated {len(result.output.suggestions)} suggestions")
        return result.output
    except Exception as e:
        logger.error(f"Agent error: {str(e)}")
        raise
