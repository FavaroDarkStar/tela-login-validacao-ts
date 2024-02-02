import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";
import { useEffect, useState } from "react";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "No minimo 6 caracteres")
    .required("Campo obrigatório"),
})

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);

  const {watch, control, formState: { errors, isValid } } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
    reValidateMode: "onSubmit",
  });

  useEffect(()=>{
    setIsFormValid(isValid)
  },[isValid])


  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing/>
          <Input name="email" placeholder="Email" control={control} errorMessage={errors?.email?.message}/>
          <Input name="password" placeholder="Password" control={control} errorMessage={errors?.password?.message}/>
          <Button title="Entrar" disabled={!isFormValid}/>
        </Column>
      </LoginContainer>
      
    </Container>
  )
}

export default Login

  