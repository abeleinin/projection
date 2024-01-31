// Navbar.js
import { useCallback, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

const Navbar = ({ onStatusChange }) => {
  const [localState, setLocalState] = useState({
    None: false,
    Flash: false,
    Invisible: false,
    Movement: false
  })

  const restartGame = useCallback(() => {
    onStatusChange.restart(false)
  }, [onStatusChange.restart])

  const enableFlash = useCallback(() => {
    setLocalState({ ...localState, Flash: !localState.Flash })
    onStatusChange.enableFlash(localState['Flash'])
  }, [onStatusChange.enableFlash])

  const enableInvisible = useCallback(() => {
    setLocalState({ ...localState, Invisible: !localState.Invisible })
    console.log(localState['Invisible'])
    onStatusChange.enableInvisible(localState['Invisible'])
  }, [onStatusChange.enableInvisible])

  const enableMovement = useCallback(() => {
    setLocalState({ ...localState, Movement: !localState.Movement })
    onStatusChange.enableMovement(localState['Movement'])
  }, [onStatusChange.enableMovement])

  let buttonToCallback = {
    None: restartGame,
    Flash: enableFlash,
    Invisible: enableInvisible,
    Movement: enableMovement
  }

  return (
    <Flex
      as="nav"
      position="absolute"
      top="0"
      left="0"
      padding="1rem"
      bg="transparent"
      align="center"
      justify="flex-start"
    >
      <Button
        leftIcon={<ArrowBackIcon />}
        bg="yellow.400"
        _hover={{ bg: 'yellow.300' }}
        color="#000"
        fontSize="14pt"
        marginRight="1rem"
        onClick={restartGame}
      >
        Back
      </Button>
      {['None', 'Flash', 'Invisible', 'Movement'].map((v, _) => (
        <Button
          key={v}
          bg={localState[v] ? 'blue.400' : 'yellow.400'}
          _hover={{ bg: 'yellow.300' }}
          color="#000"
          fontSize="14pt"
          marginRight="1rem"
          onClick={buttonToCallback[v]}
        >
          {v}
        </Button>
      ))}
    </Flex>
  )
}

export default Navbar
