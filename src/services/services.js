import Dao from '../models/Dao.js';
import PostRepository from './PostRepository.js';
import TimeRepository from './TimeRepository.js';
import UserRepository from './UserRepository.js';

const dao = new Dao();

export const timeService = new TimeRepository(dao);
export const postService = new PostRepository(dao);
export const userService = new UserRepository(dao);