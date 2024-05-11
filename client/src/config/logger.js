import log from 'loglevel';

const NODE_ENV = import.meta.NODE_ENV 

const logger = log.getLogger('appLogger');


logger.setLevel(NODE_ENV === 'development' ? 'debug' : 'warn');

export default logger;

