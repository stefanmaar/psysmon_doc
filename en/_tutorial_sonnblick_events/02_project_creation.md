---
title: "Project creation"
layout: doc_chapter
subheadline: "Setting up the database and creating a project."
description: "Setting up the database and creating a project."
teaser: "The initial steps to work with psysmon ist the creation of a project. psysmon uses a database to store data. Therefore the database has to be setup properly so that psysmon can create the needed database tables."
image_dir: tut_sbe/project_creation

namespace: tut_sbe_project_creation

type: chapter

permalink: project_creation

figures:
    create-new-project-dialog:
        label: "fig:create-new-project-dialog"
        number: 1
        filename: screenshot_create_new_project_dialog.png
        caption: "The dialog to create a new project. The user name and the passwords are those that have been used to create the psysmon database."
        
    main-window-project-created:
        label: "fig:main-window-project-created"
        number: 2
        filename: screenshot_main_window_after_project_creation.png
        caption: "The psysmon main window after the project has been created."
---

To start working with psysmon, a project has to be created first. Creating a project triggers the following steps:
  - Creation of database tables related to the project;
  - Creation of a directory structure related to the project;
  - Creation of a project file;
  
## Create a project 

First create a directory on your filesystem where you want to store the psysmon directory structure and the psysmon project file. I'm creating the directory `psysmon_projects` in my `tutorial folder`.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ mkdir psysmon_projects
(psysmon) stefan@hausmeister:~/tutorial$ ls
psysmon  psysmon_projects  venv
(psysmon) stefan@hausmeister:~/tutorial$
~~~

Next start psysmon and select the menu `File -> New project`. A dialog will open where you have to enter several parameters relevant to the project. [Figure {{ page.figures.create-new-project-dialog.number }}][fig:create-new-project-dialog] shows the dialog with my data used for the tutorial. If you hover the mouse pointer over one of the dialog edit fields, a tooltip is shown describing the property of the field.

{% include insert_image.html key="create-new-project-dialog" %}

Enter the values for each field in the `Create a new project` dialog and click the `OK` button to create the project. After clicking `OK` the database tables are created. This might take some seconds during which the `Create a new project` dialog freezes. You can follow the log output of the database table creation in the terminal window where you have started psysmon. After the database table creation process has finished, the log output should also appear in the `log area` at the bottom of the psysmon main window.

The properties used to create the project are:

name
: The name of the project.

base directory
: The base directory in which the directory of the new project will be created.

database host
: The address (hostname, URL or ip address) of the database server (e.g. localhost). Use localhost if the database server is running on your local computer.

username
: The name of the psysmon database user. This is the mysql database username that has been created in the [Getting started][chap-getting-started] section.

user pwd
: The password of the database user. Leave empty if no password is used.

author name
: The name of the author related to the project. This is used to create a [uniform resource identifier][uniform-resource-id]{:target="blank"}.

author URI
: The uniform resource identifier of the author related to the project. This usually is some kind of abbreviation of the author name. It is used to create the resource id for this project.

agency name
: The agency name to which the author is related. It is used to create the resource id for this project.

agency URI
: The uniform resource identifier of the agency. This usually is some kind of abbreviation of the agency name. It is used to create the resource id for this project.

resource ID
: The resource ID is used to identify the author of digital content created during the work with psysmon.


## Main window
[Figure {{ page.figures.main-window-project-created.number }}][fig:main-window-project-created] shows the psysmon main window after the creation of the new project.

{% include insert_image.html key="main-window-project-created" %}


## Project directory

After the project has been created successfully, a directory tree inside the *base directory* has been created. It holds the project file (tutorial.ppr), data- and log files created during runtime. The root folder of each project is the project name.

~~~console
stefan@hausmeister:~/tutorial/psysmon_projects$ tree tutorial/
tutorial/
├── collection
│   └── tutorial
├── data
├── log
├── tmp
└── tutorial.ppr

5 directories, 1 file
stefan@hausmeister:~/tutorial/psysmon_projects$ 
~~~

The purpose of the directories are:

collection
: Holds the configuration files of the psysmon collections created by a user.

data
: Data created and used by psysmon. Currently not used by the program.

log
: Log files of executed collections.

tmp
: Temporary runtime data.


## Project database tables
For each project a set of tables is created in the psysmon database. To check the database tables open a console and log into the database server using a mysql client. Then select the psysmon database `psysmon_tutorial` and display the database tables using the mysql command `show tables;`.

~~~console
stefan@hausmeister:~$ mysql -u tutorial -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 55
Server version: 10.3.34-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use psysmon_tutorial;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [psysmon_tutorial]> show tables;
+-----------------------------------+
| Tables_in_psysmon_tutorial        |
+-----------------------------------+
| tutorial_datafile                 |
| tutorial_detection                |
| tutorial_detection_catalog        |
| tutorial_detection_to_event       |
| tutorial_event                    |
| tutorial_event_catalog            |
| tutorial_event_type               |
| tutorial_exampleTable             |
| tutorial_geom_array               |
| tutorial_geom_channel             |
| tutorial_geom_component_param     |
| tutorial_geom_component_to_stream |
| tutorial_geom_network             |
| tutorial_geom_rec_stream          |
| tutorial_geom_rec_stream_param    |
| tutorial_geom_recorder            |
| tutorial_geom_sensor              |
| tutorial_geom_sensor_component    |
| tutorial_geom_stat_to_array       |
| tutorial_geom_station             |
| tutorial_geom_stream_to_channel   |
| tutorial_geom_tf_pz               |
| tutorial_pick                     |
| tutorial_pick_catalog             |
| tutorial_traceheader              |
| tutorial_waveform_dir             |
| tutorial_waveform_dir_alias       |
+-----------------------------------+
27 rows in set (0.000 sec)

MariaDB [psysmon_tutorial]> exit
Bye
stefan@hausmeister:~$ 
~~~


[chap-getting-started]: {% link en/_tutorial_sonnblick_events/01_getting_started.md %}
[uniform-resource-id]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

[fig:create-new-project-dialog]: #{{ page.figures.create-new-project-dialog.label }}
[fig:main-window-project-created]: #{{ page.figures.main-window-project-created.label }}
