"""Configuration management for the Gift Suggestion API."""

import json
import os
from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )
    
    openrouter_api_key: str = Field(
        ...,
        description="OpenRouter API key for AI model access"
    )
    
    model_name: str = Field(
        default="meta-llama/llama-3.3-70b-instruct:free",
        description="AI model name to use via OpenRouter"
    )
    
    cors_origins: List[str] = Field(
        default=["http://localhost:3000"],
        description="List of allowed CORS origins"
    )
    
    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        """Parse CORS origins from environment variable.
        
        Supports:
        - JSON array string: '["http://localhost:3000", "https://example.com"]'
        - Comma-separated string: 'http://localhost:3000,https://example.com'
        - List: Already a list
        """
        if isinstance(v, str):
            # Try parsing as JSON first
            try:
                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return parsed
            except json.JSONDecodeError:
                pass
            
            # Fall back to comma-separated string
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance.
    
    Returns:
        Settings: The application settings.
        
    Raises:
        ValueError: If required environment variables are missing.
    """
    try:
        return Settings()
    except Exception as e:
        # Provide helpful error message
        error_msg = str(e)
        if "openrouter_api_key" in error_msg.lower():
            raise ValueError(
                "OPENROUTER_API_KEY environment variable is required. "
                "Please set it in your Vercel project settings."
            ) from e
        raise
