import React, { Component } from 'react';
import Card from '../components/UI/Card';
import Navbar from '../components/UI/Navbar';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { sourceAudio: "music", streamURL: "", textToSpeech: "", radioName: "", radioText: "", frequency: 87.5 };

        this.onBtnMusic = this.onBtnMusic.bind(this);
        this.onBtnTTS = this.onBtnTTS.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
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
                                    <i class="fas fa-music mr-2"></i> Play music
                                </button>
                                <button className={"btn btn-outline-secondary btn-lg ml-4" + (this.state.sourceAudio === "tts" ? " active" : "")} onClick={this.onBtnTTS}>
                                    <i class="far fa-comment-dots fa-flip-horizontal mr-2"></i> Text To Speech
                                </button>
                            </p>
                        </div>
                    </section>
                </main>
                <div className="container mb-4">
                    <form onSubmit={this.handleSubmit}>
                        { this.state.sourceAudio === "music" ? (
                            <Card title="Play Music" iconTitle="fas fa-music">
                                <div class="form-group mt-4">
                                    <label for="inputAudioURL">Audio Stream URL :</label>
                                    <input
                                        type="url"
                                        class="form-control"
                                        name="streamURL"
                                        id="inputAudioURL"
                                        value={this.state.streamURL}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter audio stream URL" />
                                </div>
                            </Card>
                        ) : (
                            <Card title="Speak text" iconTitle="far fa-comment-dots fa-flip-horizontal">
                                <div class="form-group mt-4">
                                    <label for="inputTextToSpeech">Text :</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="textToSpeech"
                                        id="inputTextToSpeech"
                                        value={this.state.textToSpeech}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter text to speech" />
                                </div>
                            </Card>
                        )}
                        <Card title="Radio Informations" iconTitle="fas fa-broadcast-tower">
                            <div className="form-row mt-4">
                                <div class="form-group col-md-4">
                                    <label for="inputAudioURL">Radio name :</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="radioName"
                                        id="inputRadioName"
                                        value={this.state.radioName}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter radio name" />
                                </div>
                                
                                <div class="form-group col-md-8">
                                    <label for="inputAudioURL">Radio text :</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="radioText"
                                        id="inputRadioText"
                                        value={this.state.radioText}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter radio text" />
                                </div>
                                <div class="form-group col-12">
                                    <label for="inputFrequency">
                                        FM Frequency : <span class="badge badge-pill badge-primary lead">{ parseFloat(this.state.frequency).toFixed(1) }</span>
                                    </label>
                                    <input
                                        type="range"
                                        class="custom-range"
                                        name="frequency"
                                        id="inputFrequency"
                                        value={this.state.frequency}
                                        onChange={this.handleInputChange}
                                        min="87.5"
                                        max="108.0"
                                        step="0.1" />
                                </div>
                            </div>
                        </Card>
                        <button type="submit" className="btn btn-outline-primary btn-lg my-2 px-4">Start the FM broadcast</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Home;