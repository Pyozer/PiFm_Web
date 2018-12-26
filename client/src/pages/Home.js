import React, { Component } from 'react';
import Card from '../components/UI/Card';
import Navbar from '../components/UI/Navbar';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { sourceAudio: "music", radioFrequency: 87.5 };

        this.onBtnMusic = this.onBtnMusic.bind(this);
        this.onBtnTTS = this.onBtnTTS.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    onBtnMusic() {
        this.setState({sourceAudio: "music"})
    }
    onBtnTTS() {
        this.setState({sourceAudio: "tts"})
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let urlApi = this.state.sourceAudio === "music" ? "/api/playmusic" : "/api/playtts";
        
        axios.post(urlApi, this.getDatas())
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    async handleStop(event) {
        await axios.post('/api/stop', this.getDatas(' '))
    }

    getDatas(textToSpeech = this.state.textToSpeech) {
        return {
            streamURL: this.state.streamURL,
            textToSpeech: textToSpeech,
            radioName: this.state.radioName,
            radioText: this.state.radioText,
            radioFrequency: parseFloat(this.state.radioFrequency).toFixed(1)
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <main role="main">
                    <section className="jumbotron text-center bg-white mb-0">
                        <div className="container">
                            <h1 className="jumbotron-heading">PiFM Control Interface</h1>
                            <p className="lead text-muted">Web Interface to control your Raspberry Pi FM transmitter</p>
                            <p>
                                <button className={"btn btn-outline-primary btn-lg" + (this.state.sourceAudio === "music" ? " active" : "")} onClick={this.onBtnMusic}>
                                    <i className="fas fa-music mr-2"></i> Play music
                                </button>
                                <button className={"btn btn-outline-secondary btn-lg ml-4" + (this.state.sourceAudio === "tts" ? " active" : "")} onClick={this.onBtnTTS}>
                                    <i className="far fa-comment-dots fa-flip-horizontal mr-2"></i> Text To Speech
                                </button>
                            </p>
                        </div>
                    </section>
                </main>
                <div className="container mb-4">
                    <form onSubmit={this.handleSubmit}>
                        { this.state.sourceAudio === "music" ? (
                            <Card title="Play Music" iconTitle="fas fa-music">
                                <div className="form-group mt-4">
                                    <label htmlFor="inputAudioURL">Audio Stream URL or YouTube link :</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        name="streamURL"
                                        id="inputAudioURL"
                                        placeholder="Enter audio stream URL or YouTube link"
                                        value={this.state.streamURL || ""}
                                        onChange={this.handleInputChange}
                                        required />
                                </div>
                            </Card>
                            
                        ) : (
                            <Card title="Speak text" iconTitle="far fa-comment-dots fa-flip-horizontal">
                                <div className="form-group mt-4">
                                    <label htmlFor="inputTextToSpeech">Text :</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        name="textToSpeech"
                                        id="inputTextToSpeech"
                                        placeholder="Enter text to speech"
                                        value={this.state.textToSpeech || ""}
                                        onChange={this.handleInputChange}
                                        required />
                                </div>
                            </Card>
                        )}
                        <Card title="Radio Informations" iconTitle="fas fa-broadcast-tower">
                            <div className="form-row mt-4">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputAudioURL">Radio name :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="radioName"
                                        id="inputRadioName"
                                        placeholder="Enter radio name"
                                        value={this.state.radioName || ""}
                                        onChange={this.handleInputChange}
                                        required />
                                </div>
                                
                                <div className="form-group col-md-8">
                                    <label htmlFor="inputAudioURL">Radio text :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="radioText"
                                        id="inputRadioText"
                                        placeholder="Enter radio text"
                                        value={this.state.radioText || ""}
                                        onChange={this.handleInputChange}
                                        required />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="inputFrequency">
                                        FM Frequency : <span className="badge badge-pill badge-primary lead">{ parseFloat(this.state.radioFrequency).toFixed(1) }</span>
                                    </label>
                                    <input
                                        type="range"
                                        className="custom-range"
                                        name="radioFrequency"
                                        id="inputFrequency"
                                        value={this.state.radioFrequency}
                                        onChange={this.handleInputChange}
                                        min="87.5"
                                        max="108.0"
                                        step="0.1"
                                        required />
                                </div>
                            </div>
                        </Card>
                        <button type="submit" className="btn btn-outline-primary btn-lg my-2 px-4">Broadcast to FM</button>
                    </form>
                    <button onClick={this.handleStop} className="btn btn-outline-danger btn-lg my-2 px-4">Stop current broadcasting</button>
                </div>
            </div>
        );
    }
}

export default Home;