import logging
from bson import ObjectId

logger = logging.getLogger(__name__)

class TodoRepository:
    def __init__(self, db):
        self.collection = db['todos']

    def list_all(self):
        docs = self.collection.find()
        return [self._format(doc) for doc in docs]

    def _format(self, doc):
        return {
            'id': str(doc['_id']),
            'description': doc.get('description')
        }

    def create(self, description):
        result = self.collection.insert_one({'description': description})

        return {
            'id': str(result[_id]),
            'description': result.get('description')
        }
