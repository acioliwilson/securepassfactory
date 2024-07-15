<template>
    <div class="general-wrapper">
        <div class="bin-target"></div>
        <div class="container">
            <div class="logo">
                <img src="@/assets/v2/logo-icon.png" />
                <div class="logo-text">
                    <span class="bolder">SecurePass</span>
                    <div class="d-flex gap-1 align-items-center">
                        <span>Factory</span>
                        <span>***</span>
                    </div>
                </div>
            </div>
    
            <p class="presentation">Shield yourself from hackers: Use strong, generated passwords.</p>
    
            <main class="panel">
                <div class="instructions">
                    <span>Please choose character options:</span>
                </div>
                <div class="options">
                    <div :class="['button', { deactived: !includeUppercase }]" @click="toggleOption('uppercase')" title="Uppercase">
                        <span class="uppercase">ABC</span>
                    </div>
                    <div :class="['button', { deactived: !includeLowercase }]" @click="toggleOption('lowercase')" title="Lowercase">
                        <span class="lowercase">abc</span>
                    </div>
                    <div :class="['button', { deactived: !includeNumbers }]" @click="toggleOption('numbers')" title="Numbers">
                        <span class="numbers">123</span>
                    </div>
                    <div :class="['button', { deactived: !includeSpecialChars }]" @click="toggleOption('specialChars')" title="Special Characters">
                        <span class="symbols">%$#</span>
                    </div>
                </div>
                <div class="password-lenght">
                    <span>Password Length:</span>
                    <div class="d-flex align-items-center gap-1 w-100">
                        <input type="range" class="pass-lenght-range" min="1" max="24" v-model="passwordLength">
                        <span>{{ passwordLength }}</span>
                    </div>
                </div>
                <button type="button" class="btn-gen" @click="generatePassword">Generate Password</button>
            </main>
            <img src="@/assets/v2/divisor.svg" class="divisor">
            <section class="generated-password">
                <p>Generated Strong Password</p>
                <input type="text" class="generated-password-input" :value="generatedPassword" disabled>
                <button class="secondary-btn-v2" type="button" @click="copyPassword">
                    <span>{{ isCopied ? 'Copied!' : 'Copy Password' }}</span>
                </button>
            </section>
            <footer>
                <span>
                    Made with 🤍 by
                </span>
                <div class="github">
                    <ion-icon name="logo-github"></ion-icon>
                    <span>acioliwilson</span>
                </div>
            </footer>
        </div>
    </div>
    </template>
    
    <script>
    export default {
        data() {
            return {
                passwordLength: 12,
                generatedPassword: '',
                isCopied: false,
                includeUppercase: true,
                includeLowercase: true,
                includeNumbers: true,
                includeSpecialChars: false // Initially deactivated in the frontend
            }
        },
        methods: {
            toggleOption(option) {
                if (option === 'uppercase') this.includeUppercase = !this.includeUppercase;
                if (option === 'lowercase') this.includeLowercase = !this.includeLowercase;
                if (option === 'numbers') this.includeNumbers = !this.includeNumbers;
                if (option === 'specialChars') this.includeSpecialChars = !this.includeSpecialChars;
            },
            generatePassword() {
                let chars = '';
                if (this.includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (this.includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
                if (this.includeNumbers) chars += '0123456789';
                if (this.includeSpecialChars) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
                if (chars === '') {
                    alert('Please select at least one character set.');
                    return;
                }
    
                let password = '';
                for (let i = 0; i < this.passwordLength; i++) {
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                this.generatedPassword = password;
            },
            copyPassword() {
                navigator.clipboard.writeText(this.generatedPassword).then(() => {
                    this.isCopied = true;
                    setTimeout(() => {
                        this.isCopied = false;
                    }, 2000); // Reset after 2 seconds
                });
            }
        }
    }
    </script>
    
    

<style lang="css" scoped>
.general-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100dvh;
    background-image: linear-gradient(320deg, #202D53, #4A2269);
    overflow-x: hidden;
}

.bin-target {
    width: 100%;
    height: 18px;
    background: url('@/assets/v2/bin.png') repeat-x;
    background-position: center;
    display: table;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    mix-blend-mode: overlay;
    animation: slowswipe 40s linear infinite;
}

@keyframes slowswipe {
    0% {
        background-position-x: 0;
    }

    100% {
        background-position-x: 100%;
    }
}

.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1024px;
    padding: 0 2rem;
    box-sizing: border-box;
    margin-top: 20px;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.bolder {
    color: #b412ed;
    font-size: 30px;
    font-weight: 700;
    font-family: 'Ubuntu Mono', monospace;
    line-height: 1;
    margin: 0;
}

.logo-text div span:nth-child(1) {
    color: #FFF;
    font-size: 30px;
    font-weight: 400;
    font-family: 'Ubuntu Mono', monospace;
    line-height: 1;
    margin: 0;
    transform: translateY(-7px);
}

.logo-text div span:nth-child(2) {
    color: #746FDD;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Ubuntu Mono', monospace;
    line-height: 1;
    margin: 0;
    letter-spacing: 2px;
    transform: translateY(-3px);
}

p.presentation {
    width: 100%;
    max-width: 1024px;
    font-size: 16px;
    color: #C2D1FE;
    text-align: center;
    margin: 30px 0 20px 0;
}

main.panel {
    display: flex;
    flex-direction: column;
}

div.instructions {
    font-size: 16px;
    color: #C2D1FE;
    text-align: center;
    margin: 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.options {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin-top: 15px;
}
.button {
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background: #B412ED;
    box-shadow: 2px 2px 30px rgba(180, 18, 237, .6);
    cursor: pointer;
    transition: .4s ease all;
}

.button:hover {
    animation: .4s bounceIn ease forwards;
    background: #be0dff;
}

@keyframes bounceIn {
    0% { transform: scale(1); }
    80% { transform: scale(1.1); }
    90% { transform: scale(.9); }
    100% { transform: scale(1); }
}

.button span {
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Ubuntu Mono', monospace;
    letter-spacing: 1px;
}

.deactived {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, .1);
    background: rgba(180, 18, 237, .4);
    border: 1px solid rgba(180, 18, 237, .4);
}

.deactived:hover {
    background: #B412ED;
    box-shadow: 2px 2px 30px rgba(180, 18, 237, .6);
}

.deactived span {
    color: #BB5CFF !important;
    transition: .4s ease all;
}

.deactived:hover span {
    color: #FFF !important;
}

.password-lenght {
    width: 100%;
    max-width: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
}

.password-lenght span {
    color: #C2D1FE;
    font-size: 16px;
    font-family: 'Ubuntu Mono', monospace;
}

.pass-lenght-range {
    width: 100%;
    display: table;
}


input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    background: #6D71AC;
    border-radius: 900px;
    outline: none;
  }
  
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #6D71AC;
    border-radius: 900px;
  }
  
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 5px;
    background: #6D71AC;
    border-radius: 900px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: #CD40FF;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 1px 1px 20px rgba(180, 18, 237, .6);
  }
  
  input[type=range]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #6D71AC;
    border-radius: 50%;
    cursor: pointer;
  }

  input[type=range]::-webkit-slider-runnable-track {
    background: #6D71AC;
  }
  
  input[type=range]::-moz-range-progress {
    background: #6D71AC;
  }

  input[type=range]::-moz-range-track {
    background: #6D71AC
  }

  .w-100 {
    width: 100%;
  }

  .btn-gen {
    padding: 14px 32px;
    border-radius: 15px;
    background: #B412ED;
    color: #FFF;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 19px;
    font-weight: 700;
    box-shadow: 2px 2px 30px rgba(180, 18, 237, .6);
    border: none;
    display: table;
    cursor: pointer;
    max-width: 300px;
    margin: 0 auto;
    transition: .4s ease all;
  }
  .btn-gen:hover {
    animation: .3s bounceIn ease forwards;
    background: #be0dff;
  }

  .generated-password {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto;
  }
  .generated-password p {
    color: #FFF;
    font-weight: 700;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 22px;
    text-align: center;
    margin: 0 auto !important;
    padding: 0 0 15px 0;
    line-height: 1;
  }
  .generated-password-input {
    text-align: center;
    padding: 15px 32px;
    border-radius: 15px;
    background: rgba(180, 18, 237, .1);
    border: 1px solid #8E35AD;
    color: #DE81FF;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 1px;
    text-shadow: 1px 1px 15px rgba(180, 18, 237, .7);
  }

  .secondary-btn-v2 {
    padding: 15px 32px;
    border-radius: 15px;
    background: #6B2DD6;
    color: #FFF;
    border: none;
    box-shadow: 4px 4px 30px rgba(105, 28, 237, .5);
    cursor: pointer;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 17px;
    font-weight: 700;
    margin-top: 10px;
    transition: .3s ease all;
  }
  .secondary-btn-v2:hover {
    animation: .4s bounceIn ease forwards;
    background: #7e12fa;
  }

  footer {
    width: 100%;
    display: inline-flex;
    gap: 7px;
    align-items: center;
    margin: 0 auto;
    max-width: 400px;
    justify-content: center;
    color: #C2D1FE;
    margin-top: 30px;
    letter-spacing: .5px;
  }
  .github {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #DE81FF;
  }

  .divisor {
    margin: 30px auto;
  }

  @media screen and (max-width: 750px) {
    .general-wrapper {
        width: 100% !important;
        display: flex;
        overflow-x: hidden !important;
    }
    p.presentation {
        width: 100% !important;
    }
    .divisor {
        width: 100%;
        height: auto;
        margin: 0 auto !important;
        padding: 30px 0;
    }
  }

</style>
