from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging, os
from pymongo import MongoClient
from .repository import TodoRepository

logger = logging.getLogger(__name__)

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todo_app = TodoRepository(db)

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = todo_app.list_all()
            return Response(todos, status=status.HTTP_200_OK)            
        except Exception as e:
            logger.error('Unable to fetch todos: %s', str(e))
            return Response({'error': 'Unable to fetch todos'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def post(self, request):
        description = request.data.get("description", "")

        if not isinstance(description, str) or not description.strip():
            return Response(
                {'error': 'Description cannot be empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        description = description.strip()

        if len(description) > 255:
            return Response(
                {'error': 'Description too long'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            new_todo = todo_app.create(description)
            return Response(new_todo, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error('Failed to create a new to do: %s', str(e))
            return Response(
                {'error': 'Unable to save to do'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR    
            )


