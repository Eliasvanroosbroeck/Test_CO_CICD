# Getting Started with the back-end

## Prerequisites

### WSL

WSL stands for Windows Subsystem Linux and allows you to install a linux distribution in Windows. It provides performant and seamless integration between windows and linux, without the need for virtualisation. Web development and a lot of its tools work better on a linux based system.
More info: <https://www.digitalocean.com/community/posts/trying-the-new-wsl-2-its-fast-windows-subsystem-for-linux>

If you're running on Windows, you can choose to install WSL2 (with ubuntu distro).
More information on how to install WSL: <https://docs.microsoft.com/en-us/windows/wsl/install>.

On mac or native linux, you can skip this step.

### VSCode

Throughout the lessons we'll use VSCode for the exercises. Make sure you have the following extensions downloaded and enabled:

-   Prettier - Code formatter
-   Auto Rename Tag
-   GitLens - Git supercharged

Open the settings of VSCode, search for **Format on save** and make sure it's checked. This assures that every time you save a file, it's being formatted according to the code style rules described in **.prettier.rc**.

Replace the values with your local configuration.

## Starting the application

Run the following commands in a terminal (**cd in the `backend` folder!!**), to get the application up and running.

First, install all required node dependencies using npm (node package manager):

```console
> npm install
```

Then, to start the backend server execute:

```console
> npm start
```

## Testing

Open your browser and navigate to <http://localhost:3000/status>.

A message saying "Back-end is running..." should appear.

If this is the case, you have succesfully completed the installation process.

## Troubleshooting

### **Network problems in WSL**

If you're having problems in WSL when executing command that require a network connection, like **curl** or **ping**, try the following:

Edit the file **/etc/wsl.conf** and add the lines:

```properties
[network]
generateResolvConf = false
```

Remove symlink **/etc/resolv.conf**

```console
> sudo rm -rf /etc/resolv.conf\*\*
```

Create a new file **/etc/resolv.conf** and add the line:

```properties
nameserver 8.8.8.8
```

Lock the resolv.conf so it doesn't get overwritten by executing:

```console
> sudo chattr +i resolv.conf
```

Restart WSL.

### **Setting WSL as default integrated terminal in VSCode**

In VSCode press **ctr/cmd-shift-p** and type **"Open Settings (JSON)"**.

In the Object **terminal.integrated.profiles.windows** add this entry:

```properties
"Ubuntu (WSL)": {
"path": "C:\\WINDOWS\\System32\\wsl.exe",
"args": ["-d", "Ubuntu"]
}
```

Find the setting **terminal.integrated.defaultProfile.windows** and change it to:

```properties
"terminal.integrated.defaultProfile.windows": "Ubuntu (WSL)"
```
