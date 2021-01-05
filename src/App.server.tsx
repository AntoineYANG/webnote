import React from 'react';
import './you.css';
import { ViewRouter, ViewCase, ViewRouterHandler } from './container/ViewRouter';
import Home from './views/Home';
import ClientContext from './server-container/ClientContext.client';
import ThemeButton from './presentational/ThemeButton';
import MarkDownEditor from './server-presentational/MarkDownEditor.server';
import styleinject from 'styleinject-y';
import User from './views/User';
import GroupSearch from './views/GroupSearch';


export let containerHandler: ViewRouterHandler = {};

const App: React.FC = () => {
  return (
    <div className="App">
      <ClientContext>
        <ViewRouter initPath="/" handler={ containerHandler } >
          <ViewCase path="/" >
            <Home />
          </ViewCase>
          <ViewCase path="/user" >
            <User />
          </ViewCase>
          <ViewCase path="/group" >
            <GroupSearch />
          </ViewCase>
          <ViewCase path="/editor" >
            <MarkDownEditor text="hello world" />
          </ViewCase>
        </ViewRouter>
        <ThemeButton />
      </ClientContext>
    </div>
  );
};

styleinject("div.App", {
  display:                "flex",
  flexDirection:          "column",
  alignItems:             "center",
  justifyContent:         "center",
  background:             "var(--Inkacy-backgroundColor)",
  width:                  "100vw",
  height:                 "100vh",
});

export default App;
