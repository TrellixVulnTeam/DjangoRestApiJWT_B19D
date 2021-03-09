from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAdminUser


class PostPermissions(BasePermission):
    message = "You have no access to this post"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if obj.author == request.user:
            return True
        return False


class CommentPermissions(BasePermission):
    message = "You have no access for this action"

    comment_read_only_methods = "get"
    comment_change_methods = ("put", "delete")

    def has_object_permission(self, request, view, obj):
        if request.method in self.comment_read_only_methods:
            return True
        if request.method in self.comment_change_methods:
            return IsAdminUser().has_permission(request, view) and (obj is request.user)
