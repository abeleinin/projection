import { Button, SimpleGrid, Heading, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useDB } from '../contexts/DatabaseContext'
import Board from '../components/board'
import Titlescreen from '../components/titlescreen'
import timeout from '../components/util'
import Level from '../components/level'

function VisualMemory() {
  const [isOn, setIsOn] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const numberList = Array.from(Array(36).keys()).map(i => i.toString())

  const initPlay = {
    isDisplay: false,
    userTurn: false,
    score: 7,
    correct: 0,
    tilePattern: [],
    userGuess: [],
    mask: [],
    userCorrect: []
  }

  const [play, setPlay] = useState(initPlay)
  const [flashTile, setFlashTile] = useState([])
  const [wrongTile, setWrongTile] = useState([])
  const [rewardTile, setRewardTile] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [playerTrial, setPlayerTrial] = useState(0)

  const [userData, setUserData] = useState({
    correct: [],
    mask: [],
    Date: new Date()
  })

  const { currentUser } = useAuth()
  const { getData, updateData } = useDB()

  // Turn on game
  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true })
    } else if (currentUser !== null) {
      getData()
        .then(userGameHistory => {
          if (userGameHistory) {
            if (!userGameHistory.visual) {
              userGameHistory.visual = new Array()
            }

            if (userData.correct.length > 1) {
              userGameHistory.visual.push(userData)
              updateData(currentUser.uid, 'visual', userGameHistory.visual)
            }
          } else {
            console.error('Failed to get user game history')
          }
        })
        .catch(error => {
          console.error('Error fetching user game history:', error.message)
        })
      setPlay(initPlay)
    }
  })

  // Select next tile in sequence
  useEffect(() => {
    if (isOn && play.isDisplay) {
      let patternIdsSet = new Set()

      let maskType = ['no-mask', 'energy-mask', 'remove-board']

      setUserData({ correct: [], mask: [], Date: new Date() })

      while (patternIdsSet.size < play.score) {
        patternIdsSet.add(Math.floor(Math.random() * 36).toString())
      }

      let patternIds = Array.from(patternIdsSet)

      setPlay({ ...play, tilePattern: patternIds, mask: maskType })
    }
  }, [isOn, play.isDisplay])

  // Display sequence of tiles
  useEffect(() => {
    if (playerTrial > 49) {
      setUserData({
        correct: play.userCorrect,
        mask: play.mask,
        Date: new Date()
      })
      setIsOver(true)
      setIsOn(false)
    } else if (isOn && play.isDisplay && play.tilePattern.length) {
      displayTiles()
    }
  }, [isOn, play.isDisplay, play.tilePattern.length])

  async function displayTiles() {
    await timeout(1000)
    setFlashTile(play.tilePattern)

    // Apply mask effect here
    if (play.mask[playerTrial] == 'energy-mask') {
      await timeout(1000)
      setFlashTile(numberList)
    } else if (play.mask[playerTrial] == 'remove-board') {
      await timeout(1000)
    }

    await timeout(1000)
    setFlashTile([])
    setPlay({ ...play, isDisplay: false, userTurn: true })
  }

  async function tileClickHandle(number) {
    if (!play.isDisplay && play.userTurn) {
      let userGuess = number.toString()
      play.userGuess.push(userGuess)
      if (play.tilePattern.includes(userGuess)) {
        let correct = play.userGuess.filter(guess =>
          play.tilePattern.includes(guess)
        )
        setFlashTile(correct)
        if (play.tilePattern.length === new Set(play.userGuess).size) {
          await timeout(500)
          setRewardTile(play.tilePattern)
          await timeout(500)
          setRewardTile([])
          setFlashTile(numberList)
          await timeout(500)
          setFlashTile([])

          // Update correct answer in database here

          setPlayerTrial(playerTrial + 1)
          setPlayerScore(playerScore + 1)

          setPlay({
            ...play,
            isDisplay: true,
            userTurn: false,
            userCorrect: [...play.userCorrect, 1],
            tilePattern: [],
            userGuess: []
          })
        }
      } else {
        setFlashTile([userGuess])
        setWrongTile([userGuess])
        await timeout(500)
        setWrongTile([])
        setFlashTile(numberList)
        await timeout(500)
        setFlashTile([])

        // Update incorrect answer in database here
        setPlayerTrial(playerTrial + 1)

        setPlay({
          ...play,
          isDisplay: true,
          userTurn: false,
          userCorrect: [...play.userCorrect, 0],
          tilePattern: [],
          userGuess: []
        })

        // If you want to allow a couple wrong guesses
        // let wrong = play.userGuess.filter(guess => !play.tilePattern.includes(guess));
        // setWrongTile(wrong)
      }
    }
  }

  if (isOn) {
    return (
      <Board>
        <Box>
          <Level>{play.score}</Level>
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
                  opacity={flashTile.includes(v) ? '1' : '0.2'}
                  _hover={{}}
                  onClick={() => tileClickHandle(v)}
                ></Button>
              ))}
          </SimpleGrid>
        </Box>
      </Board>
    )
  } else if (isOver) {
    return (
      <Board>
        <Box>
          <Heading size="xl" color="#fff" p={4}>
            Visual Memory
          </Heading>
          <Heading size="xl" color="#fff" p={2}>
            Score: {playerScore} / 50
          </Heading>
          <Heading size="2xl" color="#fff">
            Thank you for playing!
          </Heading>
          {/* <Button
            mt={10}
            bg='yellow.400'
            onClick={() => {
              setIsOn(true), setIsOver(false)
            }}
          >
            Play again
          </Button> */}
        </Box>
      </Board>
    )
  } else {
    return (
      <Board>
        <Titlescreen
          title="Visual Memory"
          symbol="🧠"
          button="Start"
          onStatusChange={setIsOn}
        >
          Remember the 7 tile pattern on a 6 x 6 grid. The game is repeated 50
          times.
        </Titlescreen>
      </Board>
    )
  }
}

export default VisualMemory
