import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import { BaseError } from 'viem'
import { useAccount, useConnect } from 'wagmi'

export function HeaderUserConnect() {
  const { connector } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  return (
    <>
      <Box>

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <Button variant={'contained'} key={x.id} onClick={() => connect({ connector: x })}>
              {'Entrar'}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </Button>
          ))}
      </Box>

      {
        error &&
        <Snackbar open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} ><Alert color='error'>{(error as BaseError).shortMessage}</Alert>
        </Snackbar >
      }
    </>

  )
}

export default HeaderUserConnect;


