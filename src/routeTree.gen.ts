/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthLayoutImport } from './routes/_auth/_layout'
import { Route as AuthLayoutIndexImport } from './routes/_auth/_layout/index'
import { Route as AuthLayoutSearchImport } from './routes/_auth/_layout/search'
import { Route as AuthLayoutListIndexImport } from './routes/_auth/_layout/list/index'
import { Route as AuthLayoutListRegisterImport } from './routes/_auth/_layout/list/register'
import { Route as AuthLayoutListDetailImport } from './routes/_auth/_layout/list/detail'
import { Route as AuthLayoutBooksSeriesImport } from './routes/_auth/_layout/books/series'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLayoutIndexRoute = AuthLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutSearchRoute = AuthLayoutSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutListIndexRoute = AuthLayoutListIndexImport.update({
  id: '/list/',
  path: '/list/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutListRegisterRoute = AuthLayoutListRegisterImport.update({
  id: '/list/register',
  path: '/list/register',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutListDetailRoute = AuthLayoutListDetailImport.update({
  id: '/list/detail',
  path: '/list/detail',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutBooksSeriesRoute = AuthLayoutBooksSeriesImport.update({
  id: '/books/series',
  path: '/books/series',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_layout': {
      id: '/_auth/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_layout/search': {
      id: '/_auth/_layout/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof AuthLayoutSearchImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/': {
      id: '/_auth/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthLayoutIndexImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/books/series': {
      id: '/_auth/_layout/books/series'
      path: '/books/series'
      fullPath: '/books/series'
      preLoaderRoute: typeof AuthLayoutBooksSeriesImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/list/detail': {
      id: '/_auth/_layout/list/detail'
      path: '/list/detail'
      fullPath: '/list/detail'
      preLoaderRoute: typeof AuthLayoutListDetailImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/list/register': {
      id: '/_auth/_layout/list/register'
      path: '/list/register'
      fullPath: '/list/register'
      preLoaderRoute: typeof AuthLayoutListRegisterImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/list/': {
      id: '/_auth/_layout/list/'
      path: '/list'
      fullPath: '/list'
      preLoaderRoute: typeof AuthLayoutListIndexImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthLayoutSearchRoute: typeof AuthLayoutSearchRoute
  AuthLayoutIndexRoute: typeof AuthLayoutIndexRoute
  AuthLayoutBooksSeriesRoute: typeof AuthLayoutBooksSeriesRoute
  AuthLayoutListDetailRoute: typeof AuthLayoutListDetailRoute
  AuthLayoutListRegisterRoute: typeof AuthLayoutListRegisterRoute
  AuthLayoutListIndexRoute: typeof AuthLayoutListIndexRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutSearchRoute: AuthLayoutSearchRoute,
  AuthLayoutIndexRoute: AuthLayoutIndexRoute,
  AuthLayoutBooksSeriesRoute: AuthLayoutBooksSeriesRoute,
  AuthLayoutListDetailRoute: AuthLayoutListDetailRoute,
  AuthLayoutListRegisterRoute: AuthLayoutListRegisterRoute,
  AuthLayoutListIndexRoute: AuthLayoutListIndexRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

interface AuthRouteChildren {
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/search': typeof AuthLayoutSearchRoute
  '/': typeof AuthLayoutIndexRoute
  '/books/series': typeof AuthLayoutBooksSeriesRoute
  '/list/detail': typeof AuthLayoutListDetailRoute
  '/list/register': typeof AuthLayoutListRegisterRoute
  '/list': typeof AuthLayoutListIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/search': typeof AuthLayoutSearchRoute
  '/': typeof AuthLayoutIndexRoute
  '/books/series': typeof AuthLayoutBooksSeriesRoute
  '/list/detail': typeof AuthLayoutListDetailRoute
  '/list/register': typeof AuthLayoutListRegisterRoute
  '/list': typeof AuthLayoutListIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/_layout': typeof AuthLayoutRouteWithChildren
  '/_auth/_layout/search': typeof AuthLayoutSearchRoute
  '/_auth/_layout/': typeof AuthLayoutIndexRoute
  '/_auth/_layout/books/series': typeof AuthLayoutBooksSeriesRoute
  '/_auth/_layout/list/detail': typeof AuthLayoutListDetailRoute
  '/_auth/_layout/list/register': typeof AuthLayoutListRegisterRoute
  '/_auth/_layout/list/': typeof AuthLayoutListIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/search'
    | '/'
    | '/books/series'
    | '/list/detail'
    | '/list/register'
    | '/list'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/search'
    | '/'
    | '/books/series'
    | '/list/detail'
    | '/list/register'
    | '/list'
  id:
    | '__root__'
    | '/_auth'
    | '/login'
    | '/_auth/_layout'
    | '/_auth/_layout/search'
    | '/_auth/_layout/'
    | '/_auth/_layout/books/series'
    | '/_auth/_layout/list/detail'
    | '/_auth/_layout/list/register'
    | '/_auth/_layout/list/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/login"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_layout"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/_layout": {
      "filePath": "_auth/_layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_layout/search",
        "/_auth/_layout/",
        "/_auth/_layout/books/series",
        "/_auth/_layout/list/detail",
        "/_auth/_layout/list/register",
        "/_auth/_layout/list/"
      ]
    },
    "/_auth/_layout/search": {
      "filePath": "_auth/_layout/search.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/": {
      "filePath": "_auth/_layout/index.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/books/series": {
      "filePath": "_auth/_layout/books/series.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/list/detail": {
      "filePath": "_auth/_layout/list/detail.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/list/register": {
      "filePath": "_auth/_layout/list/register.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/list/": {
      "filePath": "_auth/_layout/list/index.tsx",
      "parent": "/_auth/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
