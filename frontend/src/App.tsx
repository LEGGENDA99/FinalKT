import React, { useState } from 'react';
import './App.css';
import * as api from './api';

function App() {
    const [signName, setSignName] = useState('');
    const [checkName, setCheckName] = useState('');
    const [createName, setCreateName] = useState('');
    const [createSurname, setCreateSurname] = useState('');
    const [petId, setPetId] = useState('');
    const [petName, setPetName] = useState('');
    const [colorsId, setColorsId] = useState('');
    const [colorsList, setColorsList] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState('');

    const clearResponse = () => {
        setResponse(null);
        setError('');
    };

    const handleSign = async () => {
        clearResponse();
        const result = await api.sign(signName);
        if ('error' in result) setError(result.error);
        else setResponse(result);
    };

    const handleCheck = async () => {
        clearResponse();
        const result = await api.check(checkName);
        if ('error' in result) setError(result.error);
        else setResponse(result);
    };

    const handleCreate = async () => {
        clearResponse();
        const result = await api.createUser(createName, createSurname);
        if ('error' in result) setError(result.error);
        else setResponse(result);
    };

    const handleAddPet = async () => {
        clearResponse();
        const id = parseInt(petId);
        if (isNaN(id)) {
            setError('Введи номер');
            return;
        }
        const result = await api.addPet(id, petName);
        if ('error' in result) setError(result.error);
        else setResponse(result);
    };

    const handleAddColors = async () => {
        clearResponse();
        const id = parseInt(colorsId);
        if (isNaN(id)) {
            setError('Введи номер');
            return;
        }
        const colorsArray = colorsList.split(',').map(c => c.trim());
        const result = await api.addColors(id, colorsArray);
        if ('error' in result) setError(result.error);
        else setResponse(result);
    };

    return (
        <div className="app-wrapper">
            
            <div className="image-overlay"></div>

            <div className="app">
                <h1> Библиотека </h1>
                <div className="subtitle">  </div>

                <div className="container">
                    <div className="card">
                        <h2> 1. Регистрация</h2>
                        <input type="text" placeholder="Твоё имя" value={signName} onChange={(e) => setSignName(e.target.value)} />
                        <button onClick={handleSign}>Зарегистрироваться </button>
                        <div className="example-block"><p> Пример:</p><small>"Настя", "Саша"</small></div>
                    </div>

                    <div className="card">
                        <h2> 2. Проверка</h2>
                        <input type="text" placeholder="Имя для проверки" value={checkName} onChange={(e) => setCheckName(e.target.value)} />
                        <button onClick={handleCheck}>Проверить </button>
                        <div className="example-block"><p> Результат:</p><small>ID и статус существования</small></div>
                    </div>

                    <div className="card">
                        <h2> 3. Добавить фамилию</h2>
                        <input type="text" placeholder="Имя" value={createName} onChange={(e) => setCreateName(e.target.value)} />
                        <input type="text" placeholder="Фамилия" value={createSurname} onChange={(e) => setCreateSurname(e.target.value)} />
                        <button onClick={handleCreate}>Отправить </button>
                        <div className="example-block"><p> Пример:</p><small>"Макеева", "Макаров"</small></div>
                    </div>

                    <div className="card">
                        <h2> 4. Добавить питомца</h2>
                        <input type="number" placeholder="Номер пользователя" value={petId} onChange={(e) => setPetId(e.target.value)} />
                        <input type="text" placeholder="Имя питомца" value={petName} onChange={(e) => setPetName(e.target.value)} />
                        <button onClick={handleAddPet}>Добавить питомца </button>
                        <div className="example-block"><p> Пример:</p><small>ID: 1 → "Муся", "Барсик"</small></div>
                    </div>

                    <div className="card">
                        <h2> 5. Добавить цвета</h2>
                        <input type="number" placeholder="Номер пользователя" value={colorsId} onChange={(e) => setColorsId(e.target.value)} />
                        <input type="text" placeholder="Цвета через запятую" value={colorsList} onChange={(e) => setColorsList(e.target.value)} />
                        <button onClick={handleAddColors}>Добавить цвета </button>
                        <div className="example-block"><p> Пример:</p><small>ID: 1 → "фиолетовый, белый, черный"</small></div>
                    </div>
                </div>

                <div className="result-section">
                    <h3> Ответ сервера:</h3>
                    {error && (<div className="error"> {error}</div>)}
                    {response && (
                        <div className="success">
                             {response.message}
                            {response.id && <div> ID: {response.id}</div>}
                            {response.name && <div> Имя: {response.name}</div>}
                            {response.surname && <div> Фамилия: {response.surname}</div>}
                            {response.pets && <div> Питомцы: {response.pets.join(', ') || 'пока нет'}</div>}
                            {response.colors && <div> Цвета: {response.colors.join(', ') || 'пока нет'}</div>}
                            {response.exists !== undefined && (<div>{response.exists ? ' Пользователь найден!' : ' Пользователь не найден :('}</div>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;