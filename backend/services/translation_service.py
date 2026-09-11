import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from dotenv import load_dotenv


load_dotenv()

TRANSLATION_API_URL = os.getenv(
    "TRANSLATION_API_URL",
    "http://localhost:8000/translate",
)


def translate_text(text: str, source_language: str, target_language: str) -> str:
    payload = json.dumps({"text": text, "to": target_language}).encode("utf-8")
    request = Request(
        TRANSLATION_API_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=30) as response:
            result = json.load(response)
    except (HTTPError, URLError) as error:
        raise RuntimeError(f"Translation API is unavailable: {error}") from error

    translated_text = (
        result.get("translatedText")
        or result.get("translated_text")
        or result.get("translation")
    )
    if not translated_text:
        raise RuntimeError("Translation API returned no translated text")
    return translated_text
