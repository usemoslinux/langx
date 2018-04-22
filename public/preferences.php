<?php
    session_start();
    require_once('header.php');
?>

<div class="container mtb">
    <div class="row">
        <div class="col-lg-12">
            <div id="msgbox"></div>
            <form id="prefs-form" class="" action="" method="post">
                <div class="form-group">
                    <label for="fontfamily">Font Family:</label>
                    <select name="fontfamily" id="fontfamily">
                        <option value="Helvetica" <?php echo $_SESSION['fontfamily'] == 'Helvetica' ? 'selected' : ''; ?>>Helvetica</option>
                        <option value="Open Sans" <?php echo $_SESSION['fontfamily'] == 'Open Sans' ? 'selected' : ''; ?>>Open Sans</option>
                        <option value="Times New Roman" <?php echo $_SESSION['fontfamily'] == 'Times New Roman' ? 'selected' : ''; ?>>Times New Roman</option>
                        <option value="Georgia" <?php echo $_SESSION['fontfamily'] == 'Georgia' ? 'selected' : ''; ?>>Georgia</option>
                        <option value="Lato" <?php echo $_SESSION['fontfamily'] == 'Lato' ? 'selected' : ''; ?>>Lato</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fontsize">Font Size:</label>
                    <select name="fontsize" id="fontsize">
                        <option value="12pt" <?php echo $_SESSION['fontsize'] == '12pt' ? 'selected' : ''; ?>>12 pt</option>
                        <option value="14pt" <?php echo $_SESSION['fontsize'] == '14pt' ? 'selected' : ''; ?>>14 pt</option>
                        <option value="16pt" <?php echo $_SESSION['fontsize'] == '16pt' ? 'selected' : ''; ?>>16 pt</option>
                        <option value="18pt" <?php echo $_SESSION['fontsize'] == '18pt' ? 'selected' : ''; ?>>18 pt</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="lineheight">Line height:</label>
                    <select name="lineheight" id="lineheight">
                        <option value="1.5" <?php echo $_SESSION['lineheight'] == '1.5' ? 'selected' : ''; ?>>1.5 Lines</option>
                        <option value="2" <?php echo $_SESSION['lineheight'] == '2' ? 'selected' : ''; ?>>2</option>
                        <option value="2.5" <?php echo $_SESSION['lineheight'] == '2.5' ? 'selected' : ''; ?>>2.5</option>
                        <option value="3" <?php echo $_SESSION['lineheight'] == '3' ? 'selected' : ''; ?>>3</option>

                    </select>
                </div>
                <div class="form-group">
                    <label for="alignment">Text alignment:</label>
                    <select name="alignment" id="alignment">
                        <option value="left" <?php echo $_SESSION['alignment'] == 'left' ? 'selected' : ''; ?>>Left</option>
                        <option value="center" <?php echo $_SESSION['alignment'] == 'center' ? 'selected' : ''; ?>>Center</option>
                        <option value="right" <?php echo $_SESSION['alignment'] == 'right' ? 'selected' : ''; ?>>Right</option>
                        <option value="justify" <?php echo $_SESSION['alignment'] == 'justify' ? 'selected' : ''; ?>>Justify</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="mode">Mode:</label>
                    <select name="mode" id="mode">
                        <option value="light" <?php echo $_SESSION['mode'] == 'light' ? 'selected' : ''; ?>>Light</option>
                        <option value="sepia" <?php echo $_SESSION['mode'] == 'sepia' ? 'selected' : ''; ?>>Sepia</option>
                        <option value="dark" <?php echo $_SESSION['mode'] == 'dark' ? 'selected' : ''; ?>>Dark</option>
                    </select>
                </div>
                <button type="button" id="cancelbtn" name="cancel" class="btn btn-danger" onclick="window.location='/'">Cancel</button>
                <button type="submit" id="savebtn" name="submit" class="btn btn-success">Save</button>
            </form>
        </div>
    </div>
</div>

<?php require_once('footer.php') ?>

<script type="text/javascript">
    $(document).ready(function() {
        $('#prefs-form').submit(function(e) {
            $.ajax({
                url: 'db/savepreferences.php',
                type: 'post',
                data: $('#prefs-form').serialize()
            })
            .done(function() {
                $('#msgbox').html('<strong>Great!</strong> Your preferences were successfully saved.')
                    .removeClass()
                    .addClass('alert alert-success')
                    .fadeIn(2000, function() {
                        $(this).fadeOut(2000);
                    });
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#msgbox').html('<strong>Oops!</strong> Something went wrong when trying to save your preferences.')
                    .removeClass()
                    .addClass('alert alert-danger')
                    .fadeIn(2000, function() {
                        $(this).fadeOut(2000);
                    });
            });

            e.preventDefault(); // avoid to execute the actual submit of the form.
        });
    });
</script>