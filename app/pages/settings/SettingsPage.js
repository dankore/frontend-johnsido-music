import React from 'react';
import Page from '../../components/layouts/Page';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ProfileInfoSettings from '../../components/settings/UpdateProfileInfo';
import ChangePassword from '../../components/settings/ChangePassword';
import DeleteAccount from '../../components/settings/DeleteAccount';

function SettingsPage() {
  return (
    <Page title="Settings">
      <main>
        {/* <!--Sidebar--> */}
        <div className="flex flex-wrap lg:flex-no-wrap">
          <div className="pt-0 h-16 lg:min-h-full lg:pt-10 w-full lg:max-w-xs">
            <div className="text-3xl w-full text-center hidden lg:block lg:mb-6">Settings</div>
            <div className="mx-auto lg:px-6">
              <ul className="list-reset flex flex-row lg:flex-col text-center lg:text-left">
                <li className="mr-3 flex-1">
                  <NavLink
                    to="/settings/info"
                    className="block py-1 lg:py-3 pl-1 align-middle  no-underline hover:text-pink-500 border-b-2 border-gray-800 lg:border-gray-900 hover:border-pink-500"
                  >
                    <i className="fas fa-link pr-0 lg:pr-3"></i>
                    <span className="pb-1 lg:pb-0 text-xs lg:text-base block lg:inline-block">
                      Profile Information
                    </span>
                  </NavLink>
                </li>
                <li className="mr-3 flex-1">
                  <NavLink
                    to="/settings/change-password"
                    className="block py-1 lg:py-3 pl-1 align-middle  no-underline hover:text-pink-500 border-b-2 border-gray-800 lg:border-gray-900 hover:border-pink-500"
                  >
                    <i className="fas fa-link pr-0 lg:pr-3"></i>
                    <span className="pb-1 lg:pb-0 text-xs lg:text-base block lg:inline-block">
                      Change Password
                    </span>
                  </NavLink>
                </li>
                <li className="mr-3 flex-1">
                  <NavLink
                    to="/settings/delete-account"
                    className="block py-1 lg:py-3 pl-1 align-middle  no-underline hover:text-pink-500 border-b-2 border-gray-800 lg:border-gray-900 hover:border-pink-500"
                  >
                    <i className="fas fa-link pr-0 lg:pr-3"></i>
                    <span className="pb-1 lg:pb-0 text-xs lg:text-base block lg:inline-block">
                      Delete Account
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* CONTENTS */}
          <div className="w-full bg-gray-200">
            <Switch>
              <Route path="/settings/info">
                <ProfileInfoSettings />
              </Route>
              <Route path="/settings/change-password">
                <ChangePassword />
              </Route>
              <Route path="/settings/delete-account">
                <DeleteAccount />
              </Route>
              <Route>
                <Redirect to="/settings/info" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </Page>
  );
}

export default SettingsPage;
