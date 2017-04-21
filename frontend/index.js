import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { RootReducer } from './RootReducer.js';

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ?
      window.devToolsExtension() :
      f => f
  )
);

import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';

import { Page_courses } from './pages/courses';
import { Page_courses_new } from './pages/courses_new';
import { Page_courses_id } from './pages/courses_id';
import { Page_courses_id_review } from './pages/courses_id_review';
import { Page_courses_id_learn } from './pages/courses_id_learn';
import { Page_courses_id_edit } from './pages/courses_id_edit';
import { Page_profile_coursesLearnedByMe } from './pages/profile_coursesLearnedByMe';
import { Page_profile_coursesCreatedByMe } from './pages/profile_coursesCreatedByMe';
// import { ProfilePage } from './pages/profile';
import { HomePage } from './pages/home';
import { Page_test } from './pages/test';
import { Page_pleaseSignIn } from './pages/pleaseSignIn';

// common css
import './index.css';
import './fonts/font-awesome/scss/font-awesome.scss';

const auth = {
  onEnter: (nextState, transition, callback) => {
    if (!store.getState().global.Authentication.currentUser) {
      transition({ pathname: '/please-sign-in' });
    }
    callback();
  }
};

import { commonFetch } from '~/api/commonFetch';

class Page_test_2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speGetPage: { status: 'initial' }
    };
  }

  componentDidMount() {
    commonFetch(
      spe => this.setState({ speGetPage: spe }),
      'GET', `/api/pages/courses/5`
    );
  }

  render = () => {
    const spe = this.state.speGetPage;
    if (spe.status === 'request') return <div>request</div>;
    if (spe.status === 'failure') return <div>{spe.error}</div>;
    if (spe.status === 'initial') return <div>initial</div>;

    const { problems, course } = spe.payload;
    return <div className="container">
      <h1>{course.title}</h1>
    </div>;
  }
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="courses"            component={Page_courses}/>
      <Route path="courses/new"        component={Page_courses_new} {...auth}/>
      <Route path="courses/:id"        component={Page_courses_id}/>
      <Route path="courses/:id/edit"   component={Page_courses_id_edit} {...auth}/>
      <Route path="courses/:id/learn"  component={Page_courses_id_learn} {...auth}/>
      <Route path="courses/:id/review" component={Page_courses_id_review} {...auth}/>
      <Route path="profile/courses-learned-by-me" component={Page_profile_coursesLearnedByMe} {...auth}/>
      <Route path="profile/courses-created-by-me" component={Page_profile_coursesCreatedByMe} {...auth}/>

      <Route path="/please-sign-in" component={Page_pleaseSignIn}/>
      <Route path="/test" component={Page_test}/>
      <Route path="/test_2" component={Page_test_2}/>
      <Route path="/" component={HomePage}/>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
