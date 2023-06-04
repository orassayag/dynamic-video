import Joi from 'joi';
import storyBoardId from './base/storyBoard.id.validation.js';

export default Joi.object({ ...storyBoardId });
