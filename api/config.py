"""Configuration management for the Gift Suggestion API."""

import os
from functools import lru_cache
from typing import List

from pydantic import Field
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


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance.
    
    Returns:
        Settings: The application settings.
    """
    return Settings()
