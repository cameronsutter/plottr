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
var CardDialog = require('cardDialog');

var SlideCreateView = require('slides/slideCreateView');
var PresentSlidesView = require('slides/presentSlidesView');

module.exports = (
  <Routes location="history">
    <Route name="root" path="/" handler={Plottr}>
      <DefaultRoute name="boardList" handler={BoardList} />
      <Route name="boardView" handler={BoardView} path="boards/:boardId">
        <Route name="cardView" handler={CardDialog} path="cards/:cardId" />
        <Route name="newCard" handler={CardDialog} path="cards/new/:beatId/:lineId" />
      </Route>
      <Route name="boardEditor" handler={BoardEditor} path="boards/:boardId/edit" />
    </Route>
    <Route name="slideCreateView" handler={SlideCreateView} path="/slides/:boardId" >
    </Route>
    <Route name="presentSlidesView" handler={PresentSlidesView} path="/slides/:boardId/present/:lineId" />
  </Routes>
);
