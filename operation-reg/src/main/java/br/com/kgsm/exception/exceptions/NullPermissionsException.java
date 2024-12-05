package br.com.kgsm.exception.exceptions;

public class NullPermissionsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NullPermissionsException(){
        super("Permissions field is null");
    }

}
