import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import penderMiddlware from 'redux-pender'
import * as modules from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers(modules)
const middlewares = [penderMiddlware()]

const isDev = process.env.NODE_ENV === 'development'
const devtools = isDev && composeWithDevTools
const composeEnhancers = devtools || compose

export default (preloadedState={}) => createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
