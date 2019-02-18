import React, { Component } from 'react'
import { TouchableHighlight, Text, Image } from 'react-native'
import styled from 'styled-components'
import ImagePicker from 'react-native-image-picker'
import { Row, Space, Button, Bullet, Font, Input, Divider } from '../components'
import { normalize } from '../utilities'
import {
  apiGetImagesBefore,
  apiPostImagesBefore,
  apiGetImagesAfter,
  apiPostImagesAfter
} from '../api/TasksImage'

const ButtonSecondary = styled(TouchableHighlight)`
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 3;
  background-color: ${props => props.theme.color.button.secondary.color};
  padding-top: ${normalize(1)};
  padding-bottom: ${normalize(2)};
  padding-left: ${normalize(2)};
  padding-right: ${normalize(2)};
`

const ButtonText = styled(Text)`
  text-align: center;
  color: ${props => props.theme.color.button.text};
  font-size: ${normalize(30)};
  font-weight: 500;
`

const TextArea = styled(Input)`
  padding-top: ${normalize(2)};
  padding-bottom: ${normalize(2)};
  padding-left: ${normalize(4)};
  padding-right: ${normalize(4)};
  margin-top: 0;
  margin-bottom: 0;
`

const ButtonAddImage = props => {
  return (
    <Space flex={2} height="100%" mgleft={2} mgright={2}>
      <ButtonSecondary flex={1} {...props}>
        <ButtonText>+</ButtonText>
      </ButtonSecondary>
    </Space>
  )
}

const ListImageSpace = styled(Space)`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 32%;
`

const ListImage = styled(Image)`
  width: 100%;
  height: 100%;
`

class TaskAddImage extends Component {
  constructor(props) {
    super(props)

    const { taskId } = props

    this.state = {
      imageBeforeQuery: [],
      imageAfterQuery: [],
      imageBefore: [{ TaskID: taskId, Comment: '', ImageBase64: null }],
      imageAfter: [{ TaskID: taskId, Comment: '', ImageBase64: null }]
    }
  }

  componentDidMount() {
    const { taskId } = this.props
    apiGetImagesBefore(taskId).then(res => {
      this.setState({ imageBeforeQuery: res.data })
    })

    apiGetImagesAfter(taskId).then(res => {
      this.setState({ imageAfterQuery: res.data })
    })
  }

  handleAddImage = (status, index) => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, response => {
      const { imageBefore, imageAfter } = this.state
      const { taskId } = this.props

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = response.data

        const imageData = { TaskID: taskId, Comment: '', ImageBase64: null }

        switch (status) {
          case 'before':
            if (imageBefore.length < 5) {
              imageBefore.push(imageData)
            }

            imageBefore[index].ImageBase64 = source
            this.setState({ imageBefore })

            return

          case 'after':
            if (imageAfter.length < 5) {
              imageAfter.push(imageData)
            }

            imageAfter[index].ImageBase64 = source
            this.setState({ imageAfter })

            return

          default:
            break
        }
      }
    })
  }

  handleImageComment = (status, text, index) => {
    const { imageBefore, imageAfter } = this.state

    switch (status) {
      case 'before':
        imageBefore[index].Comment = text
        this.setState({ imageBefore })
        return
      case 'after':
        imageAfter[index].Comment = text
        this.setState({ imageAfter })
        return
      default:
        break
    }
  }

  checkImageNull = image => {
    const nullIndex = image.findIndex(img => img.ImageBase64 === null)

    if (nullIndex !== -1) {
      image.splice(nullIndex, 1)
    }

    if (image.length === 0) {
      return []
    }

    return image
  }

  handleImageSave = async () => {
    const { imageBefore, imageAfter } = this.state

    const response = []

    const imageBe = []

    imageBefore.forEach(img => {
      imageBe.push(img)
    })

    this.checkImageNull(imageBe).forEach(async img => {
      const responseBe = await apiPostImagesBefore(img)
      response.push(responseBe.data)
    })

    const imageAf = []

    imageAfter.forEach(img => {
      imageAf.push(img)
    })

    this.checkImageNull(imageAf).forEach(async img => {
      const responseAf = await apiPostImagesAfter(img)
      response.push(responseAf.data)
    })

    this.props.handleAddImageStatus(false)
  }

  render() {
    const {
      imageBeforeQuery,
      imageBefore,
      imageAfterQuery,
      imageAfter
    } = this.state

    const { handleAddImageStatus } = this.props

    return (
      <Space pdleft={15} pdright={15}>
        <Row>
          <Bullet small={1} />
          <Font.H2 primary={1} bold={1}>
            Image Before
          </Font.H2>
        </Row>

        {imageBeforeQuery.length > 0 ? (
          <Row flexWrap="wrap">
            {imageBeforeQuery.map((img, index) => {
              return (
                <ListImageSpace
                  key={index}
                  height={80}
                  pdtop={2}
                  pdbottom={2}
                  pdleft={2}
                  pdright={2}
                >
                  <ListImage
                    resizeMode="cover"
                    source={{
                      uri: img.ImageUrl
                    }}
                  />
                </ListImageSpace>
              )
            })}
          </Row>
        ) : null}

        {imageBefore.map((img, index) => {
          return (
            <Row key={index} height={100}>
              {img.ImageBase64 ? (
                <Image
                  flex={2}
                  height="100%"
                  source={{
                    uri: `data:image/jpeg;base64,${img.ImageBase64}`
                  }}
                  resizeMode="cover"
                />
              ) : (
                <ButtonAddImage
                  onPress={() => this.handleAddImage('before', index)}
                />
              )}

              <Space flex={3} mgleft={8}>
                <TextArea
                  flex={1}
                  placeholder="Comment"
                  multiline={true}
                  numberOfLines={4}
                  value={img.Comment}
                  onChangeText={text =>
                    this.handleImageComment('before', text, index)
                  }
                />
              </Space>
            </Row>
          )
        })}

        <Row>
          <Bullet small={1} />
          <Font.H2 primary={1} bold={1}>
            Image After
          </Font.H2>
        </Row>

        {imageAfterQuery.length > 0 ? (
          <Row flexWrap="wrap">
            {imageAfterQuery.map((img, index) => {
              return (
                <ListImageSpace
                  key={index}
                  height={80}
                  pdtop={2}
                  pdbottom={2}
                  pdleft={2}
                  pdright={2}
                >
                  <ListImage
                    resizeMode="cover"
                    source={{
                      uri: img.ImageUrl
                    }}
                  />
                </ListImageSpace>
              )
            })}
          </Row>
        ) : null}

        {imageAfter.map((img, index) => {
          return (
            <Row key={index} height={100}>
              {img.ImageBase64 ? (
                <Image
                  flex={2}
                  height="100%"
                  source={{
                    uri: `data:image/jpeg;base64,${img.ImageBase64}`
                  }}
                  resizeMode="cover"
                />
              ) : (
                <ButtonAddImage
                  onPress={() => this.handleAddImage('after', index)}
                />
              )}

              <Space flex={3} mgleft={8}>
                <TextArea
                  flex={1}
                  placeholder="Comment"
                  multiline={true}
                  numberOfLines={4}
                  value={img.Comment}
                  onChangeText={text =>
                    this.handleImageComment('after', text, index)
                  }
                />
              </Space>
            </Row>
          )
        })}

        <Space pdtop={14}>
          <Divider.Horizontal />
        </Space>

        <Space pdtop={14}>
          <Row>
            <Space flex={1} mgright={8}>
              <Button
                secondary={1}
                onPress={() => {
                  handleAddImageStatus(false)
                }}
              >
                Back
              </Button>
            </Space>

            <Space flex={1} mgleft={8}>
              <Button onPress={() => this.handleImageSave()}>Save</Button>
            </Space>
          </Row>
        </Space>
      </Space>
    )
  }
}

export { TaskAddImage }
