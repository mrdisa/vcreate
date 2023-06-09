import welcome from 'cli-welcome';
import unhandled from 'cli-handle-unhandled';

/**
 * Function to show welcome message on application init
 */
const initCli = () => {
  unhandled();

  welcome({
    title: `vcreate`,
    tagLine: `by Nikola Stankovic`,
    description: 'Create vue component from CLI for more options type `vcreate help`',
    version: '0.0.9',
    bgColor: '#36BB09',
    color: '#000000',
    bold: true,
    clear: false
  });
};

export default initCli;
