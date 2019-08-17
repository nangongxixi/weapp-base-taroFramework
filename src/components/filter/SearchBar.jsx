import PropTypes from "prop-types";
import {AtSearchBar} from "taro-ui";
import {useEffect, useState} from "@tarojs/taro";

function SearchBar({searchKey, onConfirmSearch}) {
    const onSearch = (v) => {
        setSk(v)
    }
    const [ sk, setSk] = useState(searchKey);

    useEffect(() => {
        setSk(searchKey);
    }, [searchKey]);

    return (
        <AtSearchBar
          value={sk}
          onChange={(v) => onSearch(v)}
          onClear={() => {
                setSk('');
                onConfirmSearch('', 1);
            }}
          onActionClick={() => onConfirmSearch(sk)}
        />
    )
}

SearchBar.propTypes = {
    searchKey: PropTypes.string,
    onConfirmSearch: PropTypes.func,
};

SearchBar.defaultProps = {
    searchKey: '',
    onConfirmSearch: () => {},
};

SearchBar.options = {
    addGlobalClass: true
};

export default SearchBar
