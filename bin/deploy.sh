#!/usr/bin/env bash
# change test

if [ -z $2 ]; then
    dir=`pwd`
    project="`basename $dir`"
else
    project=$2
fi

# prod
remote_host="ahome"
remote_dir="/home/jz/jz-apps/market-wxapp/www/agent-h5/"
remote_user="ftp.ftp"
remote="${remote_host}:${remote_dir}"

deploy="/home/deploy/${project}"
update="${deploy}/update.log"

# test env
test_host="web3"
test_dir="/home/www/project/jz-apps/market-wxapp/www/agent-h5/"
test_user="nobody.nobody"
test_remote="${test_host}:${test_dir}"
test_update="${deploy}/update_test.log"

# preR env
preR_host="web3"
preR_dir="/home/www/project/jz-apps/market-wxapp-pre/www/agent-h5/"
preR_user="nobody.nobody"
preR_remote="${preR_host}:${preR_dir}"
preR_update="${deploy}/update_pre.log"

usage(){
    echo "project name not found"
    echo 'usage:'
    echo '   deploy.sh deploy PROJECT_NAME'
    exit 1;
}

deploy(){
    #source /root/nvm/nvm.sh
    #npm --registry=https://registry.npm.taobao.org install
    #npm --registry=https://registry.npm.taobao.org run build

    remote=$1
    update=$2
    rsync --delete -avz ./dist/ $remote

    if [ ! -d $deploy ]; then
        mkdir $deploy
    fi
    echo "`cat .git/HEAD` '`date`'" >> $update
}

change_owner(){
    remote_host=$1
    remote_dir=$2
    remote_user=$3
    ssh $remote_host "chown ${remote_user} -R ${remote_dir}"
}

case $1 in
    "deploy")
        deploy $remote $update
        change_owner $remote_host $remote_dir $remote_user
        ;;

     "deploy_pre-r")
        deploy $preR_remote $preR_update
        change_owner $preR_host $preR_dir $preR_user
        ;;

    "deploy_test")
        deploy $test_remote $test_update
        change_owner $test_host $test_dir $test_user
        ;;
    *)
        usage
        ;;
esac
