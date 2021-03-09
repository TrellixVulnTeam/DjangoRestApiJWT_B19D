from django.contrib.auth import get_user_model

from core.viewsets import BaseModelViewSet
from .permissions import UserPermissions
from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(BaseModelViewSet):
    queryset = User.objects.all()
    permission_classes = [UserPermissions]
    serializer_class = UserSerializer
