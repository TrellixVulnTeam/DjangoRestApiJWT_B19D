from rest_framework.permissions import IsAuthenticated, BasePermission


class UserPermissions(BasePermission):
    message = "You have no access to do this"

    user_read_only_methods = "get"
    user_change_methods = ("put", "delete")

    def has_object_permission(self, request, view, obj):
        if request.method in self.user_read_only_methods:
            return True
        if request.method in self.user_change_methods:
            return IsAuthenticated().has_permission(request, view) and (obj is request.user)
