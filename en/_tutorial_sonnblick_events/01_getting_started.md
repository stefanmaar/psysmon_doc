---
title: "Getting started"
layout: doc_chapter
subheadline: "Basic setup to use psysmon."
description: "Basic setup to use psysmon."
teaser: "Here all steps needed to install and start psysmon are described. The creation of a virtual environment, the required packages, the installation of psysmon from the github source code and the setup of the database for psysmon are explained."

image_dir: tut_sbe/getting_started

namespace: tut_sbe_getting_started

type: chapter

permalink: project_getting_started

figures:
    main-window:
        label: "fig:main_window"
        number: 1
        filename: "screenshot_psysmon_main_window.png"
        caption: "The psysmon main window after startup."
---

The getting started guide covers the installation of psysmon using a **Linux** operation system. psysmon is written in [Python3][python]{:target="blank"}, therefore running the program on Windows is possible. For Windows systems, no detailed installation instructions are given, but whenever possible hints and external links are provided to facilitate window related installations steps.

## Basic Requirements
To run psysmon, a [Python3][python]{:target="blank"} interpreter and the relational database [MariaDB][mariadb]{:target="blank"} (or an equivalent system like [MySQL][mysql]{:target="blank"}) are needed. The Python3 interpreter and the MariaDB server and client are usually available in the package system of the used Linux distribution. If not already installed, install these Linux packages using the packages manager of the used Linux system.

You need the root access to the MariaDB database or at least have the rights to create databases and database users and to grant privileges for users. If you don't have these rights, please ask your system administrator to create the user and databases needed for psysmon described in [Setting up the database](#setting-up-the-database). For this tutorial it is assumed, that the MariaDB database server is running on the local computer (localhost).


## Tutorial directory structure
For this tutorial I'm using a single directory to store all the relevant content like the virtual environment, source code, data and results. I'm creating the directory `tutorial` in my home directory as the base directory.

~~~console
stefan@hausmeister:~$ mkdir tutorial
stefan@hausmeister:~$ cd tutorial
stefan@hausmeister:~/tutorial$ 
~~~

## Virtual Environment
It is recommended to use a Python virtual environment to install and run psysmon. Using a virtual environment makes it easy to install the required packages only and to avoid any prolems with conflicting package requirements of other software. In this tutorial Pythons [venv][python-venv]{:target="blank"} is used for the virual environment. Informations how to use Python venv can be found in the web, e.g. [https://python.land/virtual-environments/virtualenv](https://python.land/virtual-environments/virtualenv){:target="blank"}.

I'm creating the virual environment with the name `psysmon` in the directory `/home/stefan/tutorial/venv`.

~~~console
stefan@hausmeister:~$ cd tutorial/
stefan@hausmeister:~/tutorial$ 
stefan@hausmeister:~/tutorial$ mkdir venv
stefan@hausmeister:~/tutorial$ cd venv
stefan@hausmeister:~/tutorial/venv$ 
stefan@hausmeister:~/tutorial/venv$ python3 -m venv psysmon
stefan@hausmeister:~/tutorial/venv$
~~~

The virtual environment is a folder named `psysmon` in `/home/stefan/tutorial/venv`. To activate it, one has to source the file `activate` in the `bin` folder of the virtual environment. You don't have to be inside the directory containing the virtual environment to activate it. The activated virtual environment is indicated by the `(psysmon)` prefix of the shell prompt.

~~~console
stefan@hausmeister:~/tutorial/venv$ cd ..
stefan@hausmeister:~/tutorial$ source venv/psysmon/bin/activate
(psysmon) stefan@hausmeister:~/tutorial$ 
~~~

For any future commands it is assumed, that the virtual environment `psysmon` has already been activated.

## Installing psysmon
Before installing psysmon, two Python packages have to be installed manually. These are [numpy][numpy]{:target="blank"} and [wxpython][wxpython]{:target="blank"}. Numpy is needed prior to the installation, because psysmon uses build utilities provided by numpy. wxpython should be installed manually, because no wheel packages for Linux are available in the [PyPI][pypi]{:target="blank"} repository, they are provided on the wxpython homepage.

### Installing numpy
~~~console
(psysmon) stefan@hausmeister:~/tutorial$ pip install numpy
Collecting numpy
  Using cached numpy-1.23.1-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (17.1 MB)
Installing collected packages: numpy
Successfully installed numpy-1.23.1
(psysmon) stefan@hausmeister:~/tutorial$ 
~~~

### Installing wxpython
psysmon uses wxpython version 4.1.1. As already noted, there are no Linux wheel packages available in the PyPi repository, but wheel packages are available for download from the wxpython homepage. These packages can be installed with `pip` using a download link which depends on the used linux version. See [https://extras.wxpython.org/wxPython4/extras/linux/gtk3/](https://extras.wxpython.org/wxPython4/extras/linux/gtk3/){:target="blank"} which Linux systems are supported and [https://wxpython.org/pages/downloads/](https://wxpython.org/pages/downloads/){:target="blank"} for detailed installation instructions.

I'm using Linux Mint 20.3 which is based on Ubuntu 20.04, therefore the wheel package can be downloaded from `https://extras.wxpython.org/wxPython4/extras/linux/gtk3/ubuntu-20.04`.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ pip install -U -f https://extras.wxpython.org/wxPython4/extras/linux/gtk3/ubuntu-20.04 wxPython
Looking in links: https://extras.wxpython.org/wxPython4/extras/linux/gtk3/ubuntu-20.04
Collecting wxPython
  Using cached https://extras.wxpython.org/wxPython4/extras/linux/gtk3/ubuntu-20.04/wxPython-4.1.1-cp38-cp38-linux_x86_64.whl (149.9 MB)
Collecting pillow
  Using cached Pillow-9.2.0-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (3.1 MB)
Collecting six
  Using cached six-1.16.0-py2.py3-none-any.whl (11 kB)
Requirement already satisfied, skipping upgrade: numpy; python_version >= "3.0" in ./venv/psysmon/lib/python3.8/site-packages (from wxPython) (1.23.1)
Installing collected packages: pillow, six, wxPython
Successfully installed pillow-9.2.0 six-1.16.0 wxPython-4.1.1
(psysmon) stefan@hausmeister:~/tutorial$
~~~

### Installing psysmon from Github
psysmon is not yet available at PyPI. It is recommended to install it using the source code available on Github at [https://github.com/stefanmaar/psysmon](https://github.com/stefanmaar/psysmon){:target="blank"). Using the code from the Github repository ensures, that you are working with the latest version and eventual bugfixes can be easily incorporated.

To install psysmon from the Github repository you first have to clone the repository and then install it using pip in the development mode. Using the development mode allows that changes in the psysmon repository have an immediate effect on the working psysmon program.

#### Cloning psysmon
~~~console
stefan@hausmeister:~/tutorial$ git clone https://github.com/stefanmaar/psysmon.git
Klone nach 'psysmon' …
remote: Enumerating objects: 18405, done.
remote: Counting objects: 100% (4332/4332), done.
remote: Compressing objects: 100% (1265/1265), done.
remote: Total 18405 (delta 2927), reused 3878 (delta 2582), pack-reused 14073
Empfange Objekte: 100% (18405/18405), 11.65 MiB | 15.51 MiB/s, fertig.
Löse Unterschiede auf: 100% (11914/11914), fertig.
stefan@hausmeister:~/tutorial$ 
~~~

Check that you are working on the *main* branch.
~~~console
stefan@hausmeister:~/tutorial/psysmon$ git branch
* main
stefan@hausmeister:~/tutorial/psysmon$ 
~~~

#### Installing psysmon in development mode
To install psysmon in development mode the `pip` flag `-e` has to be used. Installing psysmon using `pip` will install all remaining package requirements. Change into the `tutorial` directory and install psysmon using the command `pip install -e ./psysmon`. 

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ pip install -e ./psysmon
Obtaining file:///home/stefan/tutorial/psysmon
Collecting PyPubSub>=4.0.3
  Using cached Pypubsub-4.0.3-py3-none-any.whl (61 kB)
Collecting Pyro4>=4.32
  Using cached Pyro4-4.82-py2.py3-none-any.whl (89 kB)
Collecting click>=8.1.3
  Using cached click-8.1.3-py3-none-any.whl (96 kB)
Collecting construct>=2.9.45
  Using cached construct-2.10.68.tar.gz (57 kB)
Processing /home/stefan/.cache/pip/wheels/8e/70/28/3d6ccd6e315f65f245da085482a2e1c7d14b90b30f239e2cf4/future-0.18.2-py3-none-any.whl
Collecting geojson>=2.5.0
  Using cached geojson-2.5.0-py2.py3-none-any.whl (14 kB)
Collecting lxml>=2.3.2
  Using cached lxml-4.9.1-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.manylinux_2_24_x86_64.whl (6.9 MB)
Collecting matplotlib>=3.2.0
  Using cached matplotlib-3.5.2-cp38-cp38-manylinux_2_5_x86_64.manylinux1_x86_64.whl (11.3 MB)
Collecting obspy>=1.1.1
  Using cached obspy-1.3.0-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (14.3 MB)
Requirement already satisfied: pillow>=2.3.0 in ./venv/psysmon/lib/python3.8/site-packages (from psysmon==0.0.2) (9.2.0)
Processing /home/stefan/.cache/pip/wheels/29/70/ec/35acc9bec1042aaa2f67009ae5cf615be86d335593bd5565e2/pycairo-1.21.0-cp38-cp38-linux_x86_64.whl
Collecting pymysql>=0.9.3
  Using cached PyMySQL-1.0.2-py3-none-any.whl (43 kB)
Collecting pyproj>=2.2.1
  Using cached pyproj-3.3.1-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (7.7 MB)
Collecting pytz>=2019.2
  Using cached pytz-2022.1-py2.py3-none-any.whl (503 kB)
Collecting scipy>=1.0.0
  Using cached scipy-1.8.1-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (41.6 MB)
Collecting seaborn>=0.9.0
  Using cached seaborn-0.11.2-py3-none-any.whl (292 kB)
Collecting sqlalchemy>=0.9.8
  Using cached SQLAlchemy-1.4.39-cp38-cp38-manylinux_2_5_x86_64.manylinux1_x86_64.manylinux_2_17_x86_64.manylinux2014_x86_64.whl (1.6 MB)
Collecting serpent>=1.27; python_version >= "3.2"
  Using cached serpent-1.41-py3-none-any.whl (9.6 kB)
Collecting packaging>=20.0
  Using cached packaging-21.3-py3-none-any.whl (40 kB)
Collecting kiwisolver>=1.0.1
  Using cached kiwisolver-1.4.3-cp38-cp38-manylinux_2_5_x86_64.manylinux1_x86_64.whl (1.2 MB)
Collecting fonttools>=4.22.0
  Using cached fonttools-4.34.4-py3-none-any.whl (944 kB)
Collecting python-dateutil>=2.7
  Using cached python_dateutil-2.8.2-py2.py3-none-any.whl (247 kB)
Requirement already satisfied: numpy>=1.17 in ./venv/psysmon/lib/python3.8/site-packages (from matplotlib>=3.2.0->psysmon==0.0.2) (1.23.1)
Collecting cycler>=0.10
  Using cached cycler-0.11.0-py3-none-any.whl (6.4 kB)
Collecting pyparsing>=2.2.1
  Using cached pyparsing-3.0.9-py3-none-any.whl (98 kB)
Collecting decorator
  Using cached decorator-5.1.1-py3-none-any.whl (9.1 kB)
Requirement already satisfied: setuptools in ./venv/psysmon/lib/python3.8/site-packages (from obspy>=1.1.1->psysmon==0.0.2) (44.0.0)
Collecting requests
  Using cached requests-2.28.1-py3-none-any.whl (62 kB)
Collecting certifi
  Using cached certifi-2022.6.15-py3-none-any.whl (160 kB)
Collecting pandas>=0.23
  Using cached pandas-1.4.3-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (11.7 MB)
Collecting greenlet!=0.4.17; python_version >= "3" and (platform_machine == "aarch64" or (platform_machine == "ppc64le" or (platform_machine == "x86_64" or (platform_machine == "amd64" or (platform_machine == "AMD64" or (platform_machine == "win32" or platform_machine == "WIN32"))))))
  Using cached greenlet-1.1.2-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (156 kB)
Requirement already satisfied: six>=1.5 in ./venv/psysmon/lib/python3.8/site-packages (from python-dateutil>=2.7->matplotlib>=3.2.0->psysmon==0.0.2) (1.16.0)
Collecting idna<4,>=2.5
  Using cached idna-3.3-py3-none-any.whl (61 kB)
Collecting urllib3<1.27,>=1.21.1
  Using cached urllib3-1.26.10-py2.py3-none-any.whl (139 kB)
Collecting charset-normalizer<3,>=2
  Using cached charset_normalizer-2.1.0-py3-none-any.whl (39 kB)
Building wheels for collected packages: construct
  Building wheel for construct (setup.py) ... error
  ERROR: Command errored out with exit status 1:
   command: /home/stefan/tutorial/venv/psysmon/bin/python -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-xdouf2mr/construct/setup.py'"'"'; __file__='"'"'/tmp/pip-install-xdouf2mr/construct/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' bdist_wheel -d /tmp/pip-wheel-9cvnprvd
       cwd: /tmp/pip-install-xdouf2mr/construct/
  Complete output (6 lines):
  usage: setup.py [global_opts] cmd1 [cmd1_opts] [cmd2 [cmd2_opts] ...]
     or: setup.py --help [cmd1 cmd2 ...]
     or: setup.py --help-commands
     or: setup.py cmd --help
  
  error: invalid command 'bdist_wheel'
  ----------------------------------------
  ERROR: Failed building wheel for construct
  Running setup.py clean for construct
Failed to build construct
Installing collected packages: PyPubSub, serpent, Pyro4, click, construct, future, geojson, lxml, pyparsing, packaging, kiwisolver, fonttools, python-dateutil, cycler, matplotlib, decorator, idna, certifi, urllib3, charset-normalizer, requests, scipy, greenlet, sqlalchemy, obspy, pycairo, pymysql, pyproj, pytz, pandas, seaborn, psysmon
    Running setup.py install for construct ... done
  Running setup.py develop for psysmon
Successfully installed PyPubSub-4.0.3 Pyro4-4.82 certifi-2022.6.15 charset-normalizer-2.1.0 click-8.1.3 construct-2.10.68 cycler-0.11.0 decorator-5.1.1 fonttools-4.34.4 future-0.18.2 geojson-2.5.0 greenlet-1.1.2 idna-3.3 kiwisolver-1.4.3 lxml-4.9.1 matplotlib-3.5.2 obspy-1.3.0 packaging-21.3 pandas-1.4.3 psysmon pycairo-1.21.0 pymysql-1.0.2 pyparsing-3.0.9 pyproj-3.3.1 python-dateutil-2.8.2 pytz-2022.1 requests-2.28.1 scipy-1.8.1 seaborn-0.11.2 serpent-1.41 sqlalchemy-1.4.39 urllib3-1.26.10
(psysmon) stefan@hausmeister:~/tutorial$ 
~~~

## Checking the installation
To check if psysmon has been installed successfully, open a python shell and import the psysmon package. You should be able to import psysmon without any error message.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ python
Python 3.8.10 (default, Mar 15 2022, 12:22:08) 
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import psysmon
>>> quit()
(psysmon) stefan@hausmeister:~/tutorial$ 
~~~

## Setting up the database
It is assumed, that the MariaDB database server is running and a database client is available. To use psysmon, a database user and a related database has to be created. This is usually done as the root user. The database name has to have the prefix `psysmon_`. Open a client connection to the local MariaDB database and create database and the user using the following commands. The database name used is `psysmon_tutorial` and the username is `tutorial` with the password `neen6aY3`. All privileges are granted to the user `tutorial` to the database `psysmon_tutorial`. Within the `tutorial` database all tables needed for the psysmon projects will be created.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ sudo mysql -u root 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 38
Server version: 10.3.34-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE DATABASE IF NOT EXISTS psysmon_tutorial;
Query OK, 1 row affected (0.010 sec)

MariaDB [(none)]> CREATE USER tutorial@'localhost' IDENTIFIED BY 'neen6aY3';
Query OK, 0 rows affected (0.166 sec)

MariaDB [(none)]> GRANT ALL ON psysmon_tutorial.* TO 'tutorial'@'localhost';
Query OK, 0 rows affected (0.031 sec)

MariaDB [(none)]> exit
Bye
~~~

To check the successful creation of the database and the user, reconnect to the database server using the `tutorial` user.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ mysql -u tutorial -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 44
Server version: 10.3.34-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use psysmon_tutorial
Database changed
MariaDB [psysmon_tutorial]> show tables;
Empty set (0.000 sec)

MariaDB [psysmon_tutorial]> exit
Bye
(psysmon) stefan@hausmeister:~/tutorial$ 
~~~

## Starting psysmon 
To start *psysmon* run the command `psysmon` in your console. After executing the command, the psysmon main window should appear. The warning about not being able to load the configuration file is ok when starting psysmon for the first time. After closing psysmon, the configuration file will be created.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ psysmon
#LOG# - 2022-07-15 12:00:45,360 - 13590 - WARNING - psysmon: Couldn't load the configuration from file /home/stefan/.config/psysmon/psysmon.cfg. Using the default configuration.
#LOG# - 2022-07-15 12:00:45,361 - 13590 - INFO - psysmon: If this is the first time starting psysmon, the configuration file will be created and the warning should not appear again.
(psysmon) stefan@hausmeister:~/tutorial$ 
~~~

{% include insert_image.html key="main-window" %}






[python]: https://www.python.org/
[mariadb]: https://mariadb.org/
[mysql]: https://www.mysql.com/ 
[python-venv]: https://docs.python.org/3/library/venv.html
[numpy]: https://numpy.org/
[wxpython]: https://wxpython.org/
[pypi]: https://pypi.org/
