import React, { Component } from 'react';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { streamURL: "", frequency: 87.5 };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <header>
                    <div className="navbar navbar-dark bg-dark box-shadow">
                        <div className="container d-flex justify-content-between">
                            <a href="/" className="navbar-brand d-flex align-items-center">
                                <i className="fas fa-broadcast-tower mr-2" style={{marginTop: -7}}></i>
                                <strong>PiFM</strong>
                            </a>
                        </div>
                    </div>
                </header>
                <main role="main">
                    <section className="jumbotron text-center bg-white">
                        <div className="container">
                            <h1 className="jumbotron-heading">PiFM Control Interface</h1>
                            <p className="lead text-muted">Web Interface for control your Raspberry Pi FM transmitter</p>
                            <p>
                                <a href="/playmusic" className="btn btn-outline-primary btn-lg m-3">
                                    <i class="fas fa-music mr-2"></i> Play music
                                </a>
                                <a href="/tts" className="btn btn-outline-secondary btn-lg m-3">
                                    <i class="far fa-comment-dots fa-flip-horizontal mr-2"></i> Text To Speech
                                </a>
                            </p>
                        </div>
                    </section>
                </main>
                <div className="container mt-5">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title mb-3"><i class="fas fa-music mr-2"></i> Play Music</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group my-4">
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
                                
                                <div class="form-group my-4">
                                    <label for="inputFrequency">FM Frequency : { this.state.frequency }</label>
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

                                <button type="submit" className="btn btn-outline-primary px-4">Valider</button>
                            </form>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Home;