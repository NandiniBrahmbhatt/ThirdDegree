from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.services.translation_service import translate_text


router = APIRouter(tags=["Translation"])


class TranslationRequest(BaseModel):
    text: str
    source_language: str
    target_language: str


@router.post("/translate")
def translate(request: TranslationRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if request.source_language == request.target_language:
        return {
            "translated_text": request.text,
            "source_language": request.source_language,
            "target_language": request.target_language,
        }

    try:
        translated_text = translate_text(
            request.text,
            request.source_language,
            request.target_language,
        )
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Translation failed: {error}") from error

    return {
        "translated_text": translated_text,
        "source_language": request.source_language,
        "target_language": request.target_language,
    }
