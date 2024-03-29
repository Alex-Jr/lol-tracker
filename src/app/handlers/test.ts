
/**
 * @command sls invoke local -f test
 */
export default async function (): Promise<void>  {
  console.log('a')

  // eslint-disable-next-line no-constant-condition
  if(1 < 0) {
    console.log('b')
  }
}