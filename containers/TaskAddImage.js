import React, { Component } from 'react'
import { TouchableHighlight, Text, Image, Keyboard, Alert } from 'react-native'
import styled from 'styled-components'
import ImagePicker from 'react-native-image-picker'
import { ModalLoading } from '../containers'
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
  padding-left: ${normalize(6)};
  padding-right: ${normalize(6)};
  margin-top: 0;
  margin-bottom: 0;
`

const ButtonAddImage = props => {
  return (
    <Space flex={2} height="100%">
      <ButtonSecondary flex={1} {...props}>
        <ButtonText>+</ButtonText>
      </ButtonSecondary>
    </Space>
  )
}

class TaskAddImage extends Component {
  constructor(props) {
    super(props)

    const { taskId } = props

    this.state = {
      imageBeforeQuery: [],
      imageAfterQuery: [],
      imageBefore: [{ TaskID: taskId, Comment: '', ImageBase64: null }],
      imageAfter: [{ TaskID: taskId, Comment: '', ImageBase64: null }],
      loading: false,
      resApi: null
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

  handleLoading = loading => {
    this.setState({ loading })
  }

  handleAddImage = (status, index) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 600,
      maxHeight: 800,
      quality: 0.8,
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

  handleImageSave = () => {
    const { imageBefore, imageAfter } = this.state

    Keyboard.dismiss()

    this.handleLoading(true)

    const response = []

    const imageBe = []

    imageBefore.forEach(img => {
      imageBe.push(img)
    })

    this.checkImageNull(imageBe).forEach(img => {
      response.push(apiPostImagesBefore(img))
    })

    const imageAf = []

    imageAfter.forEach(img => {
      imageAf.push(img)
    })

    this.checkImageNull(imageAf).forEach(img => {
      response.push(apiPostImagesAfter(img))
    })

    Promise.all(response).then(response => {
      const errImg = response.findIndex(res => res.data !== '')

      if (errImg !== -1) {
        this.setState({ resApi: response[errImg].data }, () =>
          this.handleLoading(false)
        )

        return
      }

      this.handleLoading(false)

      this.props.handleAddImageStatus(false)
    })
  }

  render() {
    const {
      imageBeforeQuery,
      imageBefore,
      imageAfterQuery,
      imageAfter,
      loading,
      resApi
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

        {imageBeforeQuery.length > 0
          ? imageBeforeQuery.map((img, index) => {
              return (
                <Space key={index} mgtop={6}>
                  <Row height={100}>
                    <Image
                      flex={2}
                      backgroundColor="#dfdfdf"
                      height="100%"
                      source={{
                        uri: img.ImageUrl
                      }}
                      resizeMode="cover"
                    />

                    <Space flex={3} mgleft={8}>
                      <Font.H2>{img.Comment}</Font.H2>
                    </Space>
                  </Row>
                  <Divider.Horizontal />
                </Space>
              )
            })
          : null}

        {imageBefore.map((img, index) => {
          return (
            <Space key={index} mgtop={8}>
              <Row height={100}>
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
            </Space>
          )
        })}

        <Space mgtop={8}>
          <Divider.Horizontal />
        </Space>

        <Space mgtop={14}>
          <Row>
            <Bullet small={1} />
            <Font.H2 primary={1} bold={1}>
              Image After
            </Font.H2>
          </Row>
        </Space>

        {imageAfterQuery.length > 0
          ? imageAfterQuery.map((img, index) => {
              return (
                <Space key={index} mgtop={6}>
                  <Row height={100}>
                    <Image
                      flex={2}
                      backgroundColor="#dfdfdf"
                      height="100%"
                      source={{
                        uri: img.ImageUrl
                      }}
                      resizeMode="cover"
                    />

                    <Space flex={3} mgleft={8}>
                      <Font.H2>{img.Comment}</Font.H2>
                    </Space>
                  </Row>
                  <Divider.Horizontal />
                </Space>
              )
            })
          : null}

        {imageAfter.map((img, index) => {
          return (
            <Space key={index} mgtop={8}>
              <Row height={100}>
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
            </Space>
          )
        })}

        <Space mgtop={8}>
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

        <ModalLoading
          loading={loading}
          onDismiss={() =>
            resApi
              ? Alert.alert(
                  '',
                  resApi,
                  [
                    {
                      text: 'OK',
                      onPress: () => this.props.handleAddImageStatus(false)
                    }
                  ],
                  { cancelable: false }
                )
              : {}
          }
        />
      </Space>
    )
  }
}

export { TaskAddImage }
