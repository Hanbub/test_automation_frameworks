import sys
import pytest
import httpx
import config
from loguru import logger


@pytest.fixture(autouse=True, scope="session")
def configure_loguru():
    # Clear previous handlers to avoid duplicate logs
    logger.remove()
    logger.add(sys.stderr, level="INFO")


class ApiClient:
    def __init__(self, base_url, timeout):
        self.base_url = base_url
        self.timeout = timeout
        self.client = httpx.Client(base_url=self.base_url, timeout=self.timeout)

    def get(self, endpoint, params=None, headers=None):
        return self.client.get(endpoint, params=params, headers=headers)

    def post(self, endpoint, data=None, headers=None):
        return self.client.post(endpoint, json=data, headers=headers)

    def put(self, endpoint, data=None, headers=None):
        return self.client.put(endpoint, json=data, headers=headers)

    def delete(self, endpoint, headers=None):
        return self.client.delete(endpoint, headers=headers)

    def close(self):
        self.client.close()


@pytest.fixture(scope="module")
def api_client():
    client = ApiClient(config.BASE_URL, config.API_TIMEOUT)
    yield client
    client.close()