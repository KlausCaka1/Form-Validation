import './App.css';
import React, {useState} from 'react';
import {Select} from 'antd';
import 'antd/dist/antd.css';

const {Option} = Select;

const Hobbies = (props) => {
    let hobby = '';
    function newHobby(event) {
        if (/^[a-zA-Z\s]*$/.test(event.key)) {
            hobby = hobby + event.key;
        }
    }
    return (
        <Select
            mode="multiple"
            className="App__input"
            onBlur={() => props.addNewHobby(hobby)}
            onKeyDown={newHobby}
            onChange={(event) => props.setValue(event)}>
            {props.hobbies.map((hobby, index) => {
                return (
                    <Option value={hobby} key={index}>
                        {hobby}
                    </Option>
                )
            })}
        </Select>
    )
}

function App() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })
    const [emailMessage, setEmailMessage] = useState('');
    const [selectHobbies, setSelectHobbies] = useState([]);
    const [hobbies, setHobbies] = useState(['Video Game', 'Music', 'Football']);

    function setFormValue(event, key) {
        if (/^[a-zA-Z\s]*$/.test(event.target.value)) {
            setForm({
                ...form,
                [key]: event.target.value
            });
        }
    }

    function setEmail(event) {
        setForm({
            ...form,
            email: event.target.value
        })

    }

    function showMessage() {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email);
        setEmailMessage(emailRex ? form.email : 'Forma duhet example@example.com')
    }

    function addHobbies(hobby) {
        setHobbies([
            ...hobbies,
            hobby
        ]);
    }

    return (
        <div className="App">
            <div>
                <input
                    className="App__input"
                    value={form.firstName}
                    onChange={(event) => setFormValue(event, 'firstName')}
                    placeholder="First Name"/>
                <input
                    className="App__input"
                    value={form.lastName}
                    onChange={(event) => setFormValue(event, 'lastName')}
                    placeholder="Last Name"/>
                <input
                    className="App__input"
                    value={form.email}
                    onBlur={showMessage}
                    onChange={setEmail}
                    placeholder="Email"/>
                <Hobbies
                    addNewHobby={addHobbies}
                    setValue={setSelectHobbies}
                    hobbies={hobbies}/>
            </div>
            <div>
                <div className='App__value'>
                    First name<br/>
                    <span>{form.firstName}</span>
                </div>
                <div className='App__value'>
                    Last name<br/>
                    <span>{form.lastName}</span>
                </div>
                <div className='App__value'>
                    Email<br/>
                    <span>
                        {emailMessage}
                    </span>
                </div>
                <div className='App__value'>
                    Hobbies<br/>
                    {selectHobbies.map((el, index) => {
                        return (
                            <span key={index}>
                               {el}
                           </span>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
