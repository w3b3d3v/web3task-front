import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile/UserProfile'))
)

const AdminOptions = Loader(
  lazy(() => import('src/content/applications/Tasks/settings/AdminOptions'))
)

const CreateTask = Loader(
  lazy(() => import('src/content/applications/Tasks/settings/CreateTask'))
);

const DetailsTasks = Loader(
  lazy(() => import('src/content/applications/Tasks/details/DetailsTask'))
)

const HomeTasks = Loader(
  lazy(() => import('src/content/applications/Tasks/HomeTasks'))
)

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);


const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomeTasks />,
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          }
        ]
      },
      {
        path: "*",
        element: <Status404 />,
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: < HomeTasks />
          },
          {
            path: 'profile',
            element: <UserProfile />
          }
        ]
      },
      {
        path: 'tasks',
        children: [
          {
            path: '',
            element: < HomeTasks />
          },
          {
            path: 'create-task',
            element: <CreateTask />
          },
          {
            path: 'details-task/:taskId',
            element: <DetailsTasks />
          }
        ]
      },
      {
        path: 'settings',
        element: <AdminOptions />
      },
    ],
  },
];

export default routes;

