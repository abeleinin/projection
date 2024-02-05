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
    <SimpleGrid spacing="1" columns={5} w="full">
      {numberList &&
        numberList.map((v, _) => (
          <Button
            key={v}
            bg={
              rewardTile.includes(v)
                ? '#38DC35'
                : wrongTile.includes(v)
                ? 'red'
                : 'white'
            }
            p={{ base: '1em', md: '1.5em', lg: '2em' }}
            fontSize={'1.5rem'}
            rounded="md"
            opacity={flashTile.includes(v) ? flashIntensity : '0.2'}
            _hover={{}}
            onClick={() => tileClickHandle(v)}
          />
        ))}
    </SimpleGrid>
  )
}

export default GridLayout
