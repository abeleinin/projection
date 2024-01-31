import { Button, SimpleGrid } from '@chakra-ui/react'

const GridLayout = ({
  numberList,
  tileClickHandle,
  rewardTile,
  wrongTile,
  flashTile,
  flashIntensity
}) => {
  return (
    <SimpleGrid spacing="1" columns={{ md: 6 }}>
      {numberList &&
        numberList.map((v, _) => (
          <Button
            key={v}
            // bg={wrongTile.includes(v) ? 'black' : 'white'}
            bg={
              rewardTile.includes(v)
                ? '#38DC35'
                : wrongTile.includes(v)
                ? 'red'
                : 'white'
            }
            p="12"
            rounded="md"
            opacity={flashTile.includes(v) ? flashIntensity : '0.2'}
            _hover={{}}
            onClick={() => tileClickHandle(v)}
          ></Button>
        ))}
    </SimpleGrid>
  )
}

export default GridLayout
