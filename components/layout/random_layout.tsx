import { Box, Button } from '@chakra-ui/react'
import { memo } from 'react'

interface RandomLayoutProps {
  numberList: string[]
  // eslint-disable-next-line no-unused-vars
  tileClickHandle: (number: any) => Promise<void>
  rewardTile: string[]
  wrongTile: string[]
  flashTile: string[]
  buttonPositions: any[]
}

const RandomLayout: React.FC<RandomLayoutProps> = memo(function RandomLayout({
  numberList,
  tileClickHandle,
  rewardTile,
  wrongTile,
  flashTile,
  buttonPositions
}) {
  return (
    <Box position="relative" width="40vw" height="60vh">
      {numberList.map((v, index) => (
        <Button
          key={v}
          position="absolute"
          left={`${buttonPositions[index]?.left}%`}
          top={`${buttonPositions[index]?.top}%`}
          bg={
            rewardTile.includes(v)
              ? '#38DC35'
              : wrongTile.includes(v)
              ? 'red'
              : 'white'
          }
          p="10"
          rounded="md"
          opacity={flashTile.includes(v) ? '1' : '0.2'}
          _hover={{}}
          onClick={() => tileClickHandle(v)}
        />
      ))}
    </Box>
  )
})

export default RandomLayout
