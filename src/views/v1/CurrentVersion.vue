<template>
<div class="homescreen">
    <div class="content">
        <div class="logo">
            <img src="@/assets/logo-icon.png" alt="Logo Icon">
            <div class="text-logo">
                <span class="primary-logo-text">SecurePass</span>
                <div class="d-flex align-items-center">
                    <span class="secondary-text-logo">Factory</span>
                    <span class="asterisk">***</span>
                </div>
            </div>
        </div>
        <p class="default-label">Shield yourself from hackers: Use strong, generated passwords.</p>
        <p class="marked-label" v-if="errorMsg">
            <span>Max length: 24 characters</span>
            <button class="close-max-length" @click="hideErrorMsg">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </p>
        <div class="d-flex gap-4 justify-content-center container-flex">
            <div class="pass-length">
                <div class="form-group">
                    <label for="length">Password Length: <strong style="color: var(--primary);">{{ passwordLength }}</strong></label>
                    <input type="range" class="ubuntu-mono-regular" style="margin-bottom: 5px;" v-model="passwordLength" min="1" max="24">
                    <div class="checkbox-group">
                        <label>
                            <input type="checkbox" v-model="includeUppercase">
                            Include Uppercase
                        </label>
                        <label>
                            <input type="checkbox" v-model="includeLowercase">
                            Include Lowercase
                        </label>
                        <label>
                            <input type="checkbox" v-model="includeNumbers">
                            Include Numbers
                        </label>
                        <label>
                            <input type="checkbox" v-model="includeSpecialChars">
                            Include Special Characters
                        </label>
                    </div>
                    <button class="primary-btn ubuntu-mono-bold" type="button" @click="generatePassword">
                        Generate Password
                    </button>
                </div>
            </div>
            <span class="divisor"></span>
            <div class="generated-pass">
                <div class="form-group">
                    <label for="generated">Generated Strong Password</label>
                    <input type="text" class="default-form ubuntu-mono-regular" disabled :value="generatedPassword">
                    <button type="button" :class="['secondary-btn ubuntu-mono-bold', { 'copied': isCopied }]" @click="copyPassword">
                        <span v-if="isCopied">
                            Copied! <ion-icon name="checkmark-outline"></ion-icon>
                        </span>
                        <span v-else>
                            Copy Password
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<router-link to="/v2">
    <div class="info-new-version">
        <span>A new version is available! Update now to v2.0 for the latest features and improvements.</span>
    </div>
</router-link>
</template>

  
<script>
export default {
    data() {
        return {
            passwordLength: 12,
            generatedPassword: '',
            isCopied: false,
            errorMsg: false,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSpecialChars: true
        }
    },
    methods: {
        generatePassword() {
            if (this.passwordLength > 24) {
                this.passwordLength = 24;
                this.errorMsg = true;
                return;
            }

            let chars = '';
            if (this.includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (this.includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
            if (this.includeNumbers) chars += '0123456789';
            if (this.includeSpecialChars) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

            if (!chars) {
                alert('Please select at least one character set.');
                return;
            }

            this.generatedPassword = Array.from({
                length: this.passwordLength
            }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        },
        copyPassword() {
            navigator.clipboard.writeText(this.generatedPassword).then(() => {
                this.isCopied = true;
                setTimeout(() => {
                    this.isCopied = false;
                }, 2000); // Reset after 2 seconds
            });
        },
        hideErrorMsg() {
            this.errorMsg = false;
        }
    }
}
</script>

    
<style lang="css" scoped>
.homescreen {
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFF;
    padding: 100px 0 !important;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.text-logo {
    display: flex;
    flex-direction: column;
}

.primary-logo-text {
    font-size: var(--title);
    color: var(--primary);
    font-weight: 400;
    line-height: 1 !important;
}

.secondary-text-logo {
    font-size: var(--title);
    color: var(--ocean-dark);
    font-weight: 700;
    line-height: 1 !important;
}

.asterisk {
    font-weight: 700;
    color: var(--primary);
    font-size: 20px;
    letter-spacing: 2px;
    margin-left: 10px;
}

.container-flex {
    width: 100%;
    max-width: 700px;
    display: flex;
    gap: 25px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 1;
}

.default-form {
    border-radius: 15px;
    padding: 15px 20px;
    font-size: var(--default-size);
    color: var(--gray);
    background: var(--light);
    border: 1px solid var(--light-gray);
    margin-bottom: 10px;
}

.primary-btn {
    padding: 15px 30px;
    background: var(--primary);
    color: var(--light);
    font-size: var(--cta-size);
    font-weight: 700;
    border: none;
    border-radius: 15px;
    box-shadow: 3px 3px 20px rgba(36, 80, 214, .2);
    display: table;
    cursor: pointer;
    transition: .3s ease all;
    margin-top: 10px;
}

.primary-btn:hover {
    background: var(--primary-hover);
}

.secondary-btn {
    padding: 15px 30px;
    background: var(--ocean-dark);
    color: var(--light);
    font-size: var(--cta-size);
    font-weight: 700;
    border: none;
    border-radius: 15px;
    box-shadow: 3px 3px 20px rgba(32, 45, 83, .2);
    display: table;
    cursor: pointer;
    transition: .3s ease all;
}

.secondary-btn:hover {
    background: var(--ocean-dark-hover);
}

.divisor {
    width: 1.4px;
    height: 100px;
    display: table;
    background: var(--light-gray);
}

@media screen and (max-width: 750px) {
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
    }

    .container-flex {
        flex-direction: column;
    }

    .divisor {
        width: 100%;
        height: 1.4px;
        display: table;
        background: var(--light-gray);
    }

    .default-label {
        text-align: center;
    }

    .marked-label {
        text-align: center;
    }

}

@media screen and (min-width: 751px) {
    .container-flex {
        align-items: center;
    }
}

.alert-msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .2);
    display: table;
    animation: .5s fadeIn ease forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        visibility: hidden;
    }

    to {
        opacity: 1;
        visibility: visible;
    }
}

.alert-msg span {
    display: inline-flex;
    gap: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    border-radius: 15px;
    background: #FFF;
    color: var(--ocean-dark);
    font-size: var(--default-size);
    font-weight: 700;
    text-align: center;
    box-shadow: 2px 2px 20px rgba(32, 45, 83, .1);
    animation: .5s popUp ease forwards;
    animation-delay: .3s;
    visibility: hidden;
}

@keyframes popUp {
    0% {
        transform: translate(-50%, -45%);
        visibility: hidden;
    }

    80% {
        transform: translate(-50%, -54%);
        visibility: visible;
    }

    90% {
        transform: translate(-50%, -48%);
        visibility: visible;
    }

    100% {
        transform: translate(-50%, -50%);
        visibility: visible;
    }
}

.close-alert {
    border: none;
    background: none;
    color: var(--primary);
    cursor: pointer;
    outline: none;
}

.secondary-btn.copied {
    background: var(--success-color);
}

.marked-label {
    margin: 0 0 10px 0;
    padding: 8px 15px;
    border-radius: 5px;
    color: var(--light);
    background: tomato;
    font-size: .9rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
    box-shadow: 1.4px 1.4px 10px rgba(255, 47, 11, 0.3);
    visibility: hidden;
    animation: 1s fadeIn ease forwards;
}

.close-max-lenght {
    background: none;
    border: none;
    cursor: pointer;
    color: #FFF;
    font-size: 1.1rem;
    transform: translateY(2px);
}

/*
        New Features
    */
.checkbox-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
}

.info-new-version {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: orange;
    color: var(--light);
    padding: 7px 32px;
    border-radius: 10px;
    box-shadow: 1px 1px 20px rgba(243, 115, 30, 0.2);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 500px) {
    .info-new-version {
        width: 80%;
    }
}
</style>
