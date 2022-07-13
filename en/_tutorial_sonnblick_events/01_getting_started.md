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
---

The getting started guide covers the installation of psysmon using a **Linux** operation system. psysmon is written in [Python3][python]{:target="blank"}, therefore running the program on Windows is possible. For Windows systems, no detailed installation instructions are given, but whenever possible hints and external links are provided to facilitate window related installations steps.

## Basic Requirements
To run psysmon, a [Python3][python]{:target="blank"} interpreter and the relational database [MariaDB][mariadb]{:target="blank"} (or an equivalent system like [MySQL][mysql]{:target="blank"}) are needed. The Python3 interpreter and the MariaDB server and client are usually available in the package system of the used Linux distribution. If not already installed, install these Linux packages using the packages manager of the used Linux system.

You need the root access to the MariaDB database or at least have the rights to create databases and database users and to grant privileges for users. If you don't have these rights, please ask your system administrator to create the user and databases needed for psysmon described in [Setting up the database](#setting-up-the-database). For this tutorial it is assumed, that the MariaDB database server is running on the local computer (localhost).

## Virtual Environment

## Installing psysmon

## Setting up the database

## Starting psysmon 



[python]: https://www.python.org/
[mariadb]: https://mariadb.org/
[mysql]: https://www.mysql.com/ 

