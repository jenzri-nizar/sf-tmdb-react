import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import AuthService from "../services/auth"
import {useAuth} from "../context/AppContext";
export default () => {
    const auth = useAuth();
    const [errorRequest, setErrorRequest] = useState(null);
    const formSchema = Yup.object().shape({
        username: Yup.string().required().email(),
        password: Yup.string().required().min(4)
    });
    const { register, handleSubmit,setError, formState: { errors } ,reset} = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    const onSubmit = (data) => {
        setErrorRequest(null);
        AuthService.login(data).then((res) => {
            auth.signin(res.data.token);
           // console.log('LOgin res => ', res.data.token);
        }).catch((error)=>{
            setErrorRequest("email or password incorrect");
        });
    }

    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                                <p className="alert-danger">{errorRequest}</p>
                                <form action="#!" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row gy-2 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" name="email" id="email"
                                                       placeholder="name@example.com" {...register("username")} />
                                                <label htmlFor="email" className="form-label">Email</label>
                                            </div>
                                            <span className="alerts">{errors.username?.message}</span>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" name="password"
                                                       id="password" defaultValue=""
                                                       placeholder="Password"  {...register("password")}  />
                                                <label htmlFor="password" className="form-label">Password</label>
                                            </div>
                                            <span className="alerts">{errors.password?.message}</span>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-grid my-3">
                                                <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
