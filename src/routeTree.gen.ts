/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutSearchImport } from './routes/_layout/search'
import { Route as LayoutListIndexImport } from './routes/_layout/list/index'
import { Route as LayoutListRegisterImport } from './routes/_layout/list/register'
import { Route as LayoutListDetailImport } from './routes/_layout/list/detail'
import { Route as LayoutBooksSeriesImport } from './routes/_layout/books/series'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSearchRoute = LayoutSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutListIndexRoute = LayoutListIndexImport.update({
  id: '/list/',
  path: '/list/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutListRegisterRoute = LayoutListRegisterImport.update({
  id: '/list/register',
  path: '/list/register',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutListDetailRoute = LayoutListDetailImport.update({
  id: '/list/detail',
  path: '/list/detail',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutBooksSeriesRoute = LayoutBooksSeriesImport.update({
  id: '/books/series',
  path: '/books/series',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_layout/search': {
      id: '/_layout/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof LayoutSearchImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/books/series': {
      id: '/_layout/books/series'
      path: '/books/series'
      fullPath: '/books/series'
      preLoaderRoute: typeof LayoutBooksSeriesImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/list/detail': {
      id: '/_layout/list/detail'
      path: '/list/detail'
      fullPath: '/list/detail'
      preLoaderRoute: typeof LayoutListDetailImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/list/register': {
      id: '/_layout/list/register'
      path: '/list/register'
      fullPath: '/list/register'
      preLoaderRoute: typeof LayoutListRegisterImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/list/': {
      id: '/_layout/list/'
      path: '/list'
      fullPath: '/list'
      preLoaderRoute: typeof LayoutListIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutSearchRoute: typeof LayoutSearchRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutBooksSeriesRoute: typeof LayoutBooksSeriesRoute
  LayoutListDetailRoute: typeof LayoutListDetailRoute
  LayoutListRegisterRoute: typeof LayoutListRegisterRoute
  LayoutListIndexRoute: typeof LayoutListIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutSearchRoute: LayoutSearchRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutBooksSeriesRoute: LayoutBooksSeriesRoute,
  LayoutListDetailRoute: LayoutListDetailRoute,
  LayoutListRegisterRoute: LayoutListRegisterRoute,
  LayoutListIndexRoute: LayoutListIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/search': typeof LayoutSearchRoute
  '/': typeof LayoutIndexRoute
  '/books/series': typeof LayoutBooksSeriesRoute
  '/list/detail': typeof LayoutListDetailRoute
  '/list/register': typeof LayoutListRegisterRoute
  '/list': typeof LayoutListIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/search': typeof LayoutSearchRoute
  '/': typeof LayoutIndexRoute
  '/books/series': typeof LayoutBooksSeriesRoute
  '/list/detail': typeof LayoutListDetailRoute
  '/list/register': typeof LayoutListRegisterRoute
  '/list': typeof LayoutListIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/_layout/search': typeof LayoutSearchRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/books/series': typeof LayoutBooksSeriesRoute
  '/_layout/list/detail': typeof LayoutListDetailRoute
  '/_layout/list/register': typeof LayoutListRegisterRoute
  '/_layout/list/': typeof LayoutListIndexRoute
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
    | '/login'
    | '/search'
    | '/'
    | '/books/series'
    | '/list/detail'
    | '/list/register'
    | '/list'
  id:
    | '__root__'
    | '/_layout'
    | '/login'
    | '/_layout/search'
    | '/_layout/'
    | '/_layout/books/series'
    | '/_layout/list/detail'
    | '/_layout/list/register'
    | '/_layout/list/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
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
        "/_layout",
        "/login"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/search",
        "/_layout/",
        "/_layout/books/series",
        "/_layout/list/detail",
        "/_layout/list/register",
        "/_layout/list/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_layout/search": {
      "filePath": "_layout/search.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/books/series": {
      "filePath": "_layout/books/series.tsx",
      "parent": "/_layout"
    },
    "/_layout/list/detail": {
      "filePath": "_layout/list/detail.tsx",
      "parent": "/_layout"
    },
    "/_layout/list/register": {
      "filePath": "_layout/list/register.tsx",
      "parent": "/_layout"
    },
    "/_layout/list/": {
      "filePath": "_layout/list/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
