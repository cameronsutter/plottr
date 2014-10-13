/** @jsx React.DOM */

var React = require('react');

var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Plottr = require('plottr');
var BoardList = require('boardList');
var BoardView = require('boardView');
var BoardEditor = require('boardEditor');

module.exports = (
  <Routes location="history">
    <Route name="root" path="/" handler={Plottr}>
      <DefaultRoute name="boardList" handler={BoardList} />
      <Route name="boardView" handler={BoardView} path="boards/:boardId" />
      <Route name="boardEditor" handler={BoardEditor} path="boards/:boardId/edit" />
    </Route>
  </Routes>
);
