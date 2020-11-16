import { combineReducers } from 'redux';
import snacks from './snacks';
import Statistics from './statistic';
import Search from './search';
import Preview from './preview';
import Auth from './auth';
import Gene from './gene';
import Variant from './variant';
import HPO from './hpo';
import Individuals from './individuals';
import Individual from './individual';
import Status from './status';
import User from './user';
import UserIndividual from './userIndividual';

export default combineReducers({
  Auth,
  snacks,
  Statistics,
  Search,
  Preview,
  Gene,
  Variant,
  HPO,
  Individuals,
  Individual,
  Status,
  User,
  UserIndividual,
});