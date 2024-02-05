import { Box, Center } from '@chakra-ui/react'
const Board = ({ children }) => {
  return (
    <Center w="100%" h="100%" bg="#37404A">
      <Box
        display="flex"
        p={{ sm: 4, md: 8 }}
        mb={{ sm: 0, md: 4 }}
        textAlign="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Center>
  )
}

export default Board
