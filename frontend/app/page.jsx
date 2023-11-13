'use client'
import { Wrapper, Text, Input, Button } from '@/app/components'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import loginWallpaper from '../public/images/loginWallpaper.jpg'
import { Background, LoginContainer, TitleContainer } from './styles'
import apiFetch from './utils/requests'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const router = useRouter()

  function handleEmail(value) {
    setEmail(value)
  }

  function handlePassword(value) {
    setPassword(value)
  }

  function handleName(value) {
    setName(value)
  }

  function handleConfirmPassword(value) {
    setConfirmPassword(value)
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  const login = async () => {
    try {
      const body = {
        email: email,
        password: password
      }

      const data = await apiFetch({
        url: `auth/login`,
        method: 'POST',
        data: body
      })

      if (data.msg.includes('!')) {
        localStorage.setItem('token', data.token)
        router.push('/routes/list', { scroll: false })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const create = async () => {
    try {
      const body = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }

      const data = await apiFetch({
        url: `auth/register`,
        method: 'POST',
        data: body
      })

      if (data.msg.includes('!')) {
        login()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token !== null) {
      router.push('/routes/list', { scroll: false })
    }
  }, [])

  return (
    <Wrapper flexbox justify="center">
      <Background zIndex="z1">
        <Image
          src={loginWallpaper}
          width={0}
          height={0}
          style={{
            width: '100vw',
            height: '100vh'
          }}
          alt="Login"
        />
      </Background>

      <Wrapper flexbox column zIndex="z3" align="center">
        <TitleContainer flexbox>
          <Text fontSize="giant" fontWeight="bold" color="primary">
            Route Way
          </Text>
        </TitleContainer>

        <LoginContainer
          flexbox
          column
          width="20rem"
          corner="rounded"
          bgcolor="white"
          padding="p30"
          justify="center"
          align="center"
        >
          {showRegister ? (
            <>
              <Wrapper border="bottom" padding margin="bottom">
                <Text fontSize="large" fontWeight="bold" color="primary">
                  Cadastre-se
                </Text>
              </Wrapper>

              <Wrapper margin="top" width="100%" flexbox column gap="g20">
                <Wrapper>
                  <Input
                    fluid
                    placeholder="Insira seu nome"
                    value={name}
                    onChange={(event) => handleName(event.target.value)}
                  />
                </Wrapper>
                <Wrapper>
                  <Input
                    fluid
                    placeholder="Insira seu e-mail"
                    value={email}
                    onChange={(event) => handleEmail(event.target.value)}
                  />
                </Wrapper>
                <Wrapper>
                  <Input
                    fluid
                    placeholder="Insira sua senha"
                    type={showPassword ? 'text' : 'password'}
                    password={true}
                    value={password}
                    handlePassword={toggleShowPassword}
                    onChange={(event) => handlePassword(event.target.value)}
                  />
                </Wrapper>
                <Wrapper>
                  <Input
                    fluid
                    placeholder="Confira sua senha"
                    type={showPassword ? 'text' : 'password'}
                    password={true}
                    value={confirmPassword}
                    handlePassword={toggleShowPassword}
                    onChange={(event) =>
                      handleConfirmPassword(event.target.value)
                    }
                  />
                </Wrapper>
                <Wrapper margin="top">
                  <Button fluid onClick={() => create()}>
                    Criar
                  </Button>
                </Wrapper>
              </Wrapper>
            </>
          ) : (
            <>
              <Wrapper border="bottom" padding margin="bottom">
                <Text fontSize="large" fontWeight="bold" color="primary">
                  Faça seu login
                </Text>
              </Wrapper>

              <Wrapper margin="top" width="100%" flexbox column gap="g20">
                <Wrapper>
                  <Input
                    fluid
                    placeholder="Insira seu e-mail"
                    value={email}
                    onChange={(event) => handleEmail(event.target.value)}
                  />
                </Wrapper>
                <Wrapper>
                  <Input
                    fluid
                    placeholder="Insira sua senha"
                    type={showPassword ? 'text' : 'password'}
                    password={true}
                    value={password}
                    handlePassword={toggleShowPassword}
                    onChange={(event) => handlePassword(event.target.value)}
                  />
                </Wrapper>
                <Wrapper margin="top">
                  <Button fluid onClick={() => login()}>
                    Entrar
                  </Button>
                </Wrapper>
                <Wrapper onClick={() => setShowRegister(true)}>
                  <Text>Novo aqui? Cadastre-se!</Text>
                </Wrapper>
              </Wrapper>
            </>
          )}
        </LoginContainer>
      </Wrapper>
    </Wrapper>
  )
}
